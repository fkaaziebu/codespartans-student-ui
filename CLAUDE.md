# CodeSpartans Student UI

Next.js student portal for the CodeSpartans platform — course marketplace, test-taking, and learning dashboard.

## Tech Stack

- **Framework:** Next.js 16 (App Router, TypeScript)
- **React:** 19
- **Styling:** Tailwind CSS 4 + `codespartans-ui.css` custom component styles
- **GraphQL:** Apollo Client 3 + GraphQL Codegen (auto-generated types)
- **Forms:** React Hook Form 7 + Zod v4
- **State:** Zustand 5 (cart updates)
- **Search:** Meilisearch via `@meilisearch/instant-meilisearch`
- **Icons:** Lucide React

## Commands

```bash
# Development
npm run dev             # Dev server on port 3000
npm run dev:watch       # Fetch schema + codegen watch + dev server (preferred)

# GraphQL types
npm run get-schema      # Pull latest schema from backend
npm run codegen         # Generate TypeScript types from .graphql files

# Production
npm run build           # Next.js production build
npm run start           # Run production server

# Code quality
npm run lint            # Next.js lint
```

## Project Structure

```
src/
├── app/                           # Next.js App Router
│   ├── layout.tsx                 # Root layout (Apollo Provider)
│   ├── page.tsx                   # Root: checks token & redirects
│   ├── (auth)/                    # Auth routes (login, register, OAuth)
│   ├── (dashboard)/               # Protected dashboard & settings
│   ├── (exams)/                   # Exam flows (my-tests, weak-areas)
│   ├── (marketplace)/             # Courses, cart, my-learning
│   ├── (setup)/                   # Onboarding (step-one through step-three)
│   ├── (testarea)/                # Test-taking interface
│   └── api/
│       ├── graphql/               # Proxy → backend GraphQL (avoids CORS)
│       ├── auth/                  # OAuth callbacks
│       ├── images/                # Remote image proxy (AWS, Vercel, localhost)
│       ├── meili/                 # Meilisearch proxy
│       └── v1/                    # REST endpoints
├── components/
│   ├── ui/                        # Reusable primitive components
│   ├── features/                  # Feature-scoped components
│   ├── modals/                    # Modal dialogs
│   └── global/                    # Layout, nav, footer
└── common/
    ├── configs/apollo-client.ts   # Apollo: auth link, refresh-on-401, subscriptions
    ├── context/                   # React Context providers
    ├── hooks/
    │   ├── mutations/             # GraphQL mutation hooks
    │   ├── queries/               # GraphQL query hooks
    │   ├── use-data-store.ts      # Zustand cart store
    │   └── use-test-countdown.ts  # Client-side test countdown timer
    └── graphql/
        ├── mutations/             # .graphql mutation files
        ├── queries/               # .graphql query files
        └── generated/             # Auto-generated — do not edit manually
```

## Environment Variables

```env
GRAPHQL_BASE_URL=http://localhost:4001/graphql
GRAPHQL_WS_BASE_URL=wss://localhost:4001/graphql/graphql-ws
REST_BASE_URL=http://localhost:4001
MEILI_URL=http://localhost:7700
MEILI_MASTER_KEY=password
MEILI_INDEX=codespartans
```

## GraphQL Workflow

All GraphQL types are auto-generated. After changing `.graphql` files or when the backend schema changes:

```bash
npm run get-schema   # Pull schema from backend
npm run codegen      # Regenerate src/common/graphql/generated/
```

Never edit files inside `src/common/graphql/generated/` manually.

## Authentication

- Tokens stored in `sessionStorage`
- Apollo Client automatically attaches `Authorization: Bearer <token>` header
- On 401: Apollo error link auto-refreshes the token or redirects to `/signin`
- Route protection: `src/app/page.tsx` checks token and setup status on load

## API Routes (Proxies)

All backend calls go through Next.js API routes — **never call the backend directly from client components**:

| Route | Purpose |
|---|---|
| `/api/graphql` | GraphQL proxy to backend |
| `/api/images/*` | Image proxy (handles remote URLs) |
| `/api/auth/*` | OAuth callbacks |
| `/api/meili/*` | Meilisearch proxy |

## Conventions

- Route groups (parentheses) organize routes without affecting URLs
- Feature components live in `src/components/features/<feature-name>/`
- Each GraphQL operation has its own `.graphql` file in `src/common/graphql/`
- Custom hooks wrap all Apollo operations (no raw `useQuery`/`useMutation` in components)
- `clsx` + `class-variance-authority` for conditional class names
