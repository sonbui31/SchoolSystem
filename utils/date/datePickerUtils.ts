import { expect, Locator, Page } from "@playwright/test";
import {
  getMonthShort,
  navigateToMonthYear,
  splitDate,
} from "../date/dateUtils";

export async function selectDate(
  panel: Locator,
  year: string,
  month: string,
  day: string
) {
  const target = `${year}-${month}-${day}`;
  const dayCell = panel.getByTitle(target);

  if (!(await dayCell.isVisible())) {
    throw new Error(`Ngày ${target} không tồn tại trong panel hiện tại`);
  }
  await dayCell.click();
}
export async function clickCreateTime(
  page: Page,
  createTimeInput: Locator,
  startTime: string,
  endTime: string
) {
  await createTimeInput.click();

  const [startYear, startMonth, startDay] = splitDate(startTime);
  const [endYear, endMonth, endDay] = splitDate(endTime);

  const datePicker = page.locator(".ant-picker-dropdown").last();
  await expect(datePicker).toBeVisible();

  // --- Panel bắt đầu ---
  const startPanel = datePicker.locator(".ant-picker-panel").first();
  await startPanel.locator(".ant-picker-year-btn").click();
  await startPanel.getByText(startYear, { exact: true }).click();

  await startPanel
    .getByText(getMonthShort(startYear, startMonth), { exact: true })
    .click();
  await selectDate(startPanel, startYear, startMonth, startDay);

  // --- Panel kết thúc ---
  const endPanel = datePicker.locator(".ant-picker-panel").nth(1);

  if (startYear === endYear && startMonth === endMonth) {
    await selectDate(startPanel, endYear, endMonth, endDay);
  } else {
    const targetMonth = getMonthShort(endYear, endMonth);
    await navigateToMonthYear(endPanel, datePicker, endYear, targetMonth);
    await selectDate(endPanel, endYear, endMonth, endDay);
  }
}
