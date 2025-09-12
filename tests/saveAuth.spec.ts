import { expect, password, test, username } from "../fixtures/fixtures";

test("Save Auth", async ({ page, context, loginPage }) => {
  await loginPage.login(username, password);
  await expect(page.getByText("Chào mừng bạn đến với")).toBeVisible();
  await context.storageState({ path: "auth.json" });
});
