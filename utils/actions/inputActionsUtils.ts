import { Locator } from "@playwright/test";

export async function fillField(locator: Locator, value: string) {
  await locator.fill(value);
}
export async function clearInputField(field: Locator) {
  await field.fill("");
}
export function validateEmail(email: string): boolean {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}
