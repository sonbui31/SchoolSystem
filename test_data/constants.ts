import { Page } from "@playwright/test";
import path from "path";

export const urls = {
  login: "https://classroom-management.vfast.pro",
  parent: "https://classroom-management.vfast.pro/parent",
};

export const SCREENSHOT_PATHS = {
  parent: "screenshots/parent",
};
export const filePaths = {
  ui: "parent-page-ui.png",
  addSuccess: "add-success.png",
  deleteSuccess: "delete-success.png",
  editSuccess: "edit-success.png",
  eyeClick: "eye-button-click.png",
  searchCode: "search-parent-code.png",
  logoutSuccess: "logout-success.png",
  approved: "search-by-status_approved.png",
  notApproved: "search-by-status_notApproved.png",
  browseAll: "browse-all.png"
};
// Helper functions
export const takeScreenshot = async (
  page: Page,
  basePath: string,
  filename: string
) => {
  await page.screenshot({
    path: path.join(basePath, filename),
  });
};

export const waitAndScreenshot = async (
  page: Page,
  timeout: number,
  basePath: string,
  filename: string
) => {
  await page.waitForTimeout(timeout);
  await takeScreenshot(page, basePath, filename);
};

export const TIMEOUTS = {
  short: 1000,
  medium: 2000,
  long: 3000,
};
