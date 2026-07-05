// @ts-expect-error error
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    // @ts-expect-error error
    setupNodeEvents(_on, _config) {},
  },
});
