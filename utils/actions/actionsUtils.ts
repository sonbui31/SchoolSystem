import { Locator, Page } from "@playwright/test";
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
  // await page.waitForSelector(".ant-select-dropdown"); // chờ dropdown mở
  // await triggerLocator.fill(optionText);
  const dropdown = page.locator(
    ".ant-select-dropdown:not(.ant-select-dropdown-hidden)"
  );
  await dropdown.waitFor({ state: "visible", timeout: 5000 });

  const dropdownOption = page
    .locator(".ant-select-dropdown .ant-select-item-option")
    .filter({ hasText: optionText });
  await page.waitForTimeout(500);

  if ((await dropdownOption.count()) === 0) {
    await dropdown
      .locator(".ant-select-item-option")
      .last()
      .scrollIntoViewIfNeeded();
  }
  // const noData = page.locator(".ant-select-dropdown .ant-empty");
  // const noData = dropdown.getByText("No data");
  // const optionCount = await dropdownOption.count();
  // if (optionCount === 0) {
  //   // Không có item nào, expect hiện No data
  //   await expect(noData).toBeVisible({ timeout: 5000 });
  //   return; // không click nữa
  // }
  await dropdownOption.first().click();
}

export async function uploadImage(fileInput: Locator, filePath: string) {
  const absolutePath = path.resolve(filePath);
  await fileInput.setInputFiles(absolutePath);
}
export async function deleteElement(page:Page, rowName: string) {
  const deleteButton = page
    .getByRole("row", { name: rowName })
    .getByRole("button")
    .nth(1);
  await clickElement(deleteButton);

}
  