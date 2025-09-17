import { Locator } from "@playwright/test";

export async function fillField(locator: Locator, value: string) {
  await locator.fill(value);
}
export async function clearInputField(field: Locator) {
  await field.fill("");
}

