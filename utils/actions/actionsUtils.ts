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
  await triggerLocator.click();
  await triggerLocator.fill(optionText);

  const noData = page.locator(".ant-select-dropdown .ant-empty");
  const dropdownOption = page
    .locator(".ant-select-dropdown .ant-select-item-option")
    .filter({ hasText: optionText });

  // Đợi dropdown render xong (để tránh race condition)
  await page.waitForTimeout(500);

  const optionCount = await dropdownOption.count();

  if (optionCount === 0) {
    // Không có item nào, expect hiện No data
    await expect(noData).toBeVisible({ timeout: 5000 });
    return; // không click nữa
  }

  // Có item thì chọn
  await dropdownOption.first().click();
}
export async function clickDropdownOption(
  comboLocator: Locator,
  optionText: string,
  page: Page
) {
  await selectDropdownOption(comboLocator, optionText, page);
}

export async function uploadImage(fileInput: Locator, filePath: string) {
  const absolutePath = path.resolve(filePath);
  await fileInput.setInputFiles(absolutePath);
}
