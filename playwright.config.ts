import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  use: {
    baseURL: "https://example.com", // thay bằng URL trang của bạn
    headless: true,
    screenshot: "only-on-failure",
    // video: "retain-on-failure",
    trace: "retain-on-failure",
    viewport: null,
  },
  projects: [
    {
      name: "chromium",
      use: {
        launchOptions: {
          args: ["--start-maximized"],
        },
      },
    },
    // {
    //   name: "firefox",
    //    use: {
    //     launchOptions: {
    //       args: ["--start-maximized"],
    //     },
    //   },
    // },
    // {
    //   name: "webkit",
    //   use: {
    //     launchOptions: {
    //       args: ["--start-maximized"],
    //     },
    //   },
    // },
  ],
  reporter: [
    ["html", { open: "never" }],
    // Cấu hình reporter để lưu ảnh vào thư mục cụ thể
    // Ví dụ: Lưu ảnh lỗi vào thư mục 'test-results'
    ["list"],
  ],
});
