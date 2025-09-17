// Tách "YYYY-MM-DD" thành [year, month, day]
export function splitDate(dateStr: string): [string, string, string] {
  return dateStr.split("-") as [string, string, string];
}

// Convert month number -> "Jan", "Feb", ...
export function getMonthShort(year: string, month: string): string {
  return new Date(`${year}-${month}-01`).toLocaleString("en-US", {
    month: "short",
  });
}

// Kiểm tra panel hiển thị đã đúng chưa
// export async function navigateToMonthYear(
//   panel: any,
//   datePicker: any,
//   targetYear: string,
//   targetMonth: string
// ) {
//   let visibleMonth = await panel.locator(".ant-picker-month-btn").innerText();
//   let visibleYear = await panel.locator(".ant-picker-year-btn").innerText();

//   while (visibleMonth !== targetMonth || visibleYear !== targetYear) {
//     await datePicker.locator(".ant-picker-header-next-btn").last().click();
//     visibleMonth = await panel.locator(".ant-picker-month-btn").innerText();
//     visibleYear = await panel.locator(".ant-picker-year-btn").innerText();
//   }
// }

export async function navigateToMonthYear(
  panel: any,
  datePicker: any,
  targetYear: string,
  targetMonthShort: string
) {
  const nextBtn = datePicker.locator(".ant-picker-header-next-btn").last();
  const prevBtn = datePicker.locator(".ant-picker-header-prev-btn").last();

  while (true) {
    const visibleMonth = (
      await panel.locator(".ant-picker-month-btn").innerText()
    ).trim();
    const visibleYear = (
      await panel.locator(".ant-picker-year-btn").innerText()
    ).trim();

    if (visibleMonth === targetMonthShort && visibleYear === targetYear) {
      break;
    }

    const currentDate = new Date(`${visibleMonth} 1, ${visibleYear}`);
    const targetDate = new Date(`${targetMonthShort} 1, ${targetYear}`);

    if (currentDate < targetDate) {
      await nextBtn.click();
    } else {
      await prevBtn.click();
    }
  }
}
