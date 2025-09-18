import { expect, Locator, Page } from "@playwright/test";

export async function fillField(locator: Locator, value: string) {
  await locator.fill(value);
}
export async function clearInputField(field: Locator) {
  await field.fill("");
}
export async function expectOnlyValidChars(
  page: Page,
  input: Locator,
  text: string
) {
  await input.fill("");
  await input.type(text, { delay: 50 });
  await page.keyboard.press("Tab"); // blur để hệ thống xử lý

  const actual = await input.inputValue();
  const filtered = text.replace(/[^\p{L}\p{N}\s]/gu, "");
  // Loại bỏ tất cả ký tự đặc biệt, chỉ giữ chữ cái, số, khoảng trắng

  await expect(actual).toBe(filtered);
}
