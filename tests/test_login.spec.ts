import path from "path";
import { test, expect, username, password } from "../fixtures/fixtures.ts";
import { clickElement, goToUrl } from "../utils/actions/actionsUtils.ts";
import { fillField } from "../utils/actions/inputActionsUtils.ts";
import { urls } from "../test_data/constants.ts";

test.describe("Functions on login page", () => {
  test.beforeEach(async ({ loginPage }) => {
    await goToUrl(loginPage.page, urls.login);
  });
  test("Login success", async ({ page, loginPage }) => {
    await loginPage.login(username, password);
    await expect(page.getByText("Chào mừng bạn đến với")).toBeVisible();
    await page.screenshot({
      path: path.join("screenshots", "login", "login_success.png"),
    });
  });
  test("Login without username", async ({ page, loginPage }) => {
    await fillField(loginPage.password_textbox, password);

    await page.waitForTimeout(1000);
    await clickElement(loginPage.login_button);
    await expect(page.getByText("Hãy nhập email")).toBeVisible();
    await page.screenshot({
      path: path.join("screenshots", "login", "login_without_username.png"),
    });
  });
  test("Login without password", async ({ page, loginPage }) => {
    await fillField(loginPage.username_textbox, username);
    await page.waitForTimeout(1000);
    await clickElement(loginPage.login_button);
    await expect(page.getByText("Hãy nhập password")).toBeVisible();
    await page.screenshot({
      path: path.join("screenshots", "login", "login_without_password.png"),
    });
  });
});
