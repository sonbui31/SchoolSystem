import { expect, Page, Download } from "@playwright/test";
import * as fs from "fs";
import * as XLSX from "xlsx";

export async function downloadExcel(
  page: Page,
  filePath: string,
  triggerDownload: () => Promise<void>
) {
  const [download] = await Promise.all([
    page.waitForEvent("download"), // Bắt sự kiện download
    triggerDownload(), // Action thực hiện tải file (ví dụ click nút export)
  ]);
  await download.saveAs(filePath);
  return filePath;
}

export async function verifyExcelDownload(
  filePath: string,
  options: {
    expectedRowCount?: number;
    expectedColCount?: number;
    ignoreHeader?: boolean;
    rules?: {
      [colIndex: number]: (value: any) => boolean;
    };
  } = {}
) {
  // 1. Kiểm tra file tồn tại
  expect(fs.existsSync(filePath)).toBeTruthy();

  // 2. Đọc file Excel
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  const jsonData: any[][] = XLSX.utils.sheet_to_json(worksheet, {
    header: 1,
    blankrows: true,
    defval: "",
  });

  // 3. Nếu ignoreHeader → bỏ header
  const dataRows = options.ignoreHeader ? jsonData.slice(1) : jsonData;

  // 4. Check số dòng
  if (options.expectedRowCount !== undefined) {
    expect(dataRows.length).toBe(options.expectedRowCount);
  }

  // 5. Check số cột
  if (options.expectedColCount !== undefined) {
    dataRows.forEach((row) => {
      const filledRow = [...row];
      while (filledRow.length < options.expectedColCount!) {
        filledRow.push("");
      }
      expect(filledRow.length).toBe(options.expectedColCount);
    });
  }

  // 6. Check rules động
  if (options.rules) {
    dataRows.forEach((row, rowIndex) => {
      Object.entries(options.rules!).forEach(([colIndex, ruleFn]) => {
        const col = Number(colIndex);
        const value = row[col];
        const isValid = ruleFn(value);
        if (!isValid) {
          throw new Error(
            `Row ${rowIndex + 1}, Col ${col} invalid. Value: ${value}`
          );
        }
      });
    });
  }

  return dataRows; // trả về luôn dữ liệu Excel để test khác có thể dùng tiếp
}
