import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000/graphql",
  documents: "src/common/graphql/**/*.graphql",
  generates: {
    "src/common/graphql/generated/": {
      preset: "client",
    },
    "src/graphql.d.ts": {
      plugins: ["typescript-graphql-files-modules"],
    },
  },
};

export default config;
