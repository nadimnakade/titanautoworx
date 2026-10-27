import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "tests/e2e",
  timeout: 45_000,
  fullyParallel: true,
  workers: 4,
  reporter: [["list"]],
  use: { baseURL: "http://localhost:3100", ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
  webServer: { command: "npx next start -p 3100", port: 3100, reuseExistingServer: true, timeout: 60_000 },
});
