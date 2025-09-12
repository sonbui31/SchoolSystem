import { expect, Locator, Page } from "@playwright/test";

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
  const dropdownOption = page
    .locator(".ant-select-dropdown .ant-select-item-option")
    .filter({ hasText: optionText });
  await expect(dropdownOption.first()).toBeVisible({ timeout: 5000 });
  await dropdownOption.first().click();
}
export async function clickDropdownOption(
  comboLocator: Locator,
  optionText: string
) {
  await this.selectDropdownOption(comboLocator, optionText);
}
