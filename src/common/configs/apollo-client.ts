// imports
import {
  ApolloClient,
  createHttpLink,
  fromPromise,
  InMemoryCache,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
import { useDataStore } from "../hooks/use-data-store";

if (process.env.GRAPHQL_WS_BASE_URL === undefined) {
  throw new Error("GRAPHQL_WS_BASE_URL is undefined");
}

// apollo http link — requests go through the local API proxy to avoid mixed-content
// blocks when the app is served over HTTPS (e.g. Vercel) but the backend is HTTP.
const httpLink = createHttpLink({
  uri: "/api/graphql",
});

// apollo ws link
const wsLink = new GraphQLWsLink(
  createClient({
    // @ts-ignore
    url: process.env.GRAPHQL_WS_BASE_URL,
    connectionParams() {
      const token = sessionStorage.getItem("token");
      return {
        Authorization: token ? `Bearer ${token}` : "",
      };
    },
  }),
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink,
);

// apollo auth link — skip override if caller already set an Authorization header
// (used by OTP flow which passes its own pending-deletion token via context)
const authLink = setContext((_, { headers }) => {
  if (headers?.authorization) return { headers };
  const token = sessionStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

async function fetchNewAccessToken(): Promise<string> {
  const refreshToken = sessionStorage.getItem("refreshToken");
  if (!refreshToken) throw new Error("No refresh token");

  const res = await fetch("/api/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `mutation RefreshStudentToken($refreshToken: String!) {
        refreshStudentToken(refresh_token: $refreshToken) {
          access_token
        }
      }`,
      variables: { refreshToken },
    }),
  });

  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0].message);
  return json.data.refreshStudentToken.access_token;
}

let isRefreshing = false;
let pendingCallbacks: Array<() => void> = [];

const resolvePending = () => {
  pendingCallbacks.forEach((cb) => cb());
  pendingCallbacks = [];
};

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (!graphQLErrors) return;

  for (const err of graphQLErrors) {
    const code = err.extensions?.code as string | undefined;

    if (code === "SUBSCRIPTION_REQUIRED") {
      useDataStore.getState().openPaywall(err.message);
      return;
    }

    if (code === "UNAUTHENTICATED" || code === "401") {
      if (["LoginChild"].includes(operation.operationName)) {
        return;
      }

      if (isRefreshing) {
        return fromPromise(
          new Promise<void>((resolve) => {
            pendingCallbacks.push(resolve);
          }),
        ).flatMap(() => {
          const token = sessionStorage.getItem("token");
          operation.setContext(
            ({ headers = {} }: { headers: Record<string, string> }) => ({
              headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : "",
              },
            }),
          );
          return forward(operation);
        });
      }

      isRefreshing = true;
      return fromPromise(
        fetchNewAccessToken()
          .then((newToken) => {
            sessionStorage.setItem("token", newToken);
            resolvePending();
            return newToken;
          })
          .catch((err) => {
            const msg = err instanceof Error ? err.message : "";
            pendingCallbacks = [];
            sessionStorage.clear();
            if (typeof window !== "undefined") {
              if (msg.includes("Account has been deactivated"))
                window.location.href = "/signin?reason=deactivated";
              else if (msg.includes("Password was recently changed"))
                window.location.href = "/signin?reason=password_changed";
              else window.location.href = "/signin";
            }
            return null;
          })
          .finally(() => {
            isRefreshing = false;
          }),
      )
        .filter(Boolean)
        .flatMap(() => {
          const token = sessionStorage.getItem("token");
          operation.setContext(
            ({ headers = {} }: { headers: Record<string, string> }) => ({
              headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : "",
              },
            }),
          );
          return forward(operation);
        });
    }
  }
});

// apollo client
const client = new ApolloClient({
  link: errorLink.concat(authLink).concat(splitLink),
  cache: new InMemoryCache(),
});

export default client;
