import { expect, Locator, Page } from "@playwright/test";

export async function selectPaginationOption(
  pagination: Locator,
  dropDown: Locator,
  value: string
) {
  const currentValue = (await pagination.innerText()).trim();
  if (currentValue === `${value} / page`) {
    console.log(`Pagination đã là ${value} / page → bỏ qua đổi.`);
    return;
  }
  await pagination.click();

  await dropDown.getByRole("option", { name: `${value} / page` }).click();
  await expect(pagination).toHaveText(`${value} / page`);
}

export async function verifyRowsPerPage(
  rowLocator: Locator,
  expectedRows: number
) {
  const rowCount = await rowLocator.count();
  if (rowCount > expectedRows) {
    throw new Error(
      `Số dòng hiển thị là ${rowCount}, nhưng mong đợi ${expectedRows}`
    );
  }
}
