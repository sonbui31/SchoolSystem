import { expect, Locator, Page } from "@playwright/test";
import path from "path";

export async function goToUrl(page: Page, url: string) {
  await page.goto(url);
}
export async function clickElement(element: Locator) {
  await element.click();
}
export async function selectDropdownOption(
  triggerLocator: Locator,
  optionText: string,
  page: Page
) {
  await triggerLocator.click({ force: true });
  await page.waitForSelector(".ant-select-dropdown"); // chờ dropdown mở
  // await triggerLocator.fill(optionText);

  const input = triggerLocator.locator(
    "input.ant-select-selection-search-input"
  );
  if (await input.count()) {
    await input.fill(optionText);
    await page.waitForTimeout(300); // cho AntD render lại option
  }

  const noData = page.locator(".ant-select-dropdown .ant-empty");
  const dropdownOption = page
    .locator(".ant-select-dropdown .ant-select-item-option")
    .filter({ hasText: optionText });
  await page.waitForTimeout(500);
  const optionCount = await dropdownOption.count();

  if (optionCount === 0) {
    // Không có item nào, expect hiện No data
    await expect(noData).toBeVisible({ timeout: 5000 });
    return; // không click nữa
  }
  await dropdownOption.first().click();
}
// export async function clickDropdownOption(
//   comboLocator: Locator,
//   optionText: string,
//   page: Page
// ) {
//   await selectDropdownOption(comboLocator, optionText, page);
// }

export async function uploadImage(fileInput: Locator, filePath: string) {
  const absolutePath = path.resolve(filePath);
  await fileInput.setInputFiles(absolutePath);
}
