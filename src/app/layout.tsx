"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import "../styles/codespartans-ui.css";

import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "../common/configs";
import { SubscriptionPaywallModal } from "../components/modals";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ApolloProvider client={apolloClient}>
          {children}
          <SubscriptionPaywallModal />
        </ApolloProvider>
      </body>
    </html>
  );
}
