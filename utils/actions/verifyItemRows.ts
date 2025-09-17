import { expect, Locator } from "@playwright/test";

export async function verifyItemTable(allRows: Locator) {
  const count = await allRows.count();
  for (let i = 0; i < count; i++) {
    await expect(allRows.nth(i)).toBeVisible();
  }
}

export function getRowElements(rows: Locator, index: number) {
  const row = rows.nth(index);
  return {
    row,
    editBtn: row.getByRole("button", { name: "Edit" }),
    deleteBtn: row.getByRole("button", { name: "Delete" }),
  };
}

// Helper: assert trạng thái enable/disable theo duyệt
export async function assertRowActions(
  row: Locator,
  expectedApproved: boolean,
  index?: number
) {
  const editBtn = row.getByRole("button", { name: "Edit" });
  const deleteBtn = row.getByRole("button", { name: "Delete" });

  if (expectedApproved) {
    await expect(editBtn, `Row ${index} edit disabled`).toBeDisabled();
    await expect(deleteBtn, `Row ${index} delete disabled`).toBeDisabled();
  } else {
    await expect(editBtn, `Row ${index} edit enabled`).toBeEnabled();
    await expect(deleteBtn, `Row ${index} delete enabled`).toBeEnabled();
  }
}

export const verifySearchResult = async (
  allRows: Locator,
  noData: Locator,
  verifyFn?: (allRows: Locator) => Promise<void>
) => {
  if ((await allRows.count()) > 0) {
    if (verifyFn) {
      await verifyFn(allRows);
    }
  } else {
    await expect(noData).toHaveText("No data");
  }
};
