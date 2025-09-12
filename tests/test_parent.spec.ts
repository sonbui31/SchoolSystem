import { filePaths, SCREENSHOT_PATHS } from "./../test_data/constants";
import { Page } from "@playwright/test";
import { test, expect } from "../fixtures/fixtures";
import { downloadExcel, verifyExcelDownload } from "../utils/excelUtils";
import { clearInputField, fillField } from "../utils/actions/inputActionsUtils";
import { clickElement, goToUrl } from "../utils/actions/actionsUtils";
import {
  assertRowActions,
  getRowElements,
  verifyItemTable,
  verifySearchResult,
} from "../utils/actions/verifyItemRows";
import { TEST_DATA } from "../test_data/parentData";
import {
  takeScreenshot,
  TIMEOUTS,
  urls,
  waitAndScreenshot,
} from "../test_data/constants";
import { isWithinInterval, parse } from "date-fns";
import { ParentPage } from "../pages/parent.page";
import fs from "fs";

test.use({ storageState: "auth.json" });

test.beforeEach(async ({ parentPage }) => {
  await goToUrl(parentPage.page, urls.parent);
});

test("Parent Page Access", async ({ page, parentPage }) => {
  await expect(page).toHaveURL(urls.parent);
  await page.waitForTimeout(TIMEOUTS.short);
  await expect(parentPage.bodyRows.first()).toBeVisible();
  await waitAndScreenshot(
    page,
    TIMEOUTS.short,
    SCREENSHOT_PATHS.parent,
    filePaths.ui
  );
});

test.describe("Parent Management Functions", () => {
  test.describe("Add Parent function", () => {
    test("Add new parent with business staff", async ({ page, parentPage }) => {
      const user = TEST_DATA.data.user1;
      await parentPage.addParent(
        user.name,
        user.email,
        user.phone,
        user.address,
        user.facebook,
        user.note,
        user.bussinessStaff
      );
      await expect(page.getByText("Thêm mới thành công.")).toBeVisible();
    });

    test("Add new parent without business staff", async ({
      page,
      parentPage,
    }) => {
      const user = TEST_DATA.data.user2;
      await parentPage.addParent(
        user.name,
        user.email,
        user.phone,
        user.address,
        user.facebook,
        user.note
      );
      await expect(page.getByText("Thêm mới thành công.")).toBeVisible();
      await takeScreenshot(page, SCREENSHOT_PATHS.parent, filePaths.addSuccess);
    });
    test("Add parent without Fullname", async ({ page, parentPage }) => {
      const user = TEST_DATA.data.emptyFullname;
      await parentPage.addParent(
        user.name,
        user.email,
        user.phone,
        user.address,
        user.facebook,
        user.note,
        user.bussinessStaff
      );
      await expect(page.getByText("Không bỏ trống !")).toBeVisible();
    });
    test.describe("Email input", () => {
      const invalidEmails = [
        { case: "without email", data: TEST_DATA.data.emptyEmail },
        { case: "with empty email", data: TEST_DATA.data.emptyEmail },
        { case: "with invalid email", data: TEST_DATA.data.invalidEmail },
      ];

      for (const scenario of invalidEmails) {
        test(`Add parent ${scenario.case}`, async ({ page, parentPage }) => {
          const user = scenario.data;
          await parentPage.addParent(
            user.name,
            user.email,
            user.phone,
            user.address,
            user.facebook,
            user.note,
            user.bussinessStaff
          );
          await expect(page.getByText("Hãy nhập email hợp lệ!")).toBeVisible();
        });
      }

      test("Remove spaces at both ends", async ({ page, parentPage }) => {
        const user = TEST_DATA.data.trimdEmail;
        await parentPage.addParent(
          user.name,
          user.email,
          user.phone,
          user.address,
          user.facebook,
          user.note,
          user.bussinessStaff
        );
        await expect(page.getByText("Thêm mới thành công.")).toBeVisible();
      });
    });
    test.describe("The textbox is not required", () => {
      const invalidEmails = [
        { case: "with blank phone", data: TEST_DATA.data.emptyPhone },
        { case: "with blank address", data: TEST_DATA.data.emptyAddress },
        { case: "with blank facebook", data: TEST_DATA.data.emptyFacebook },
        { case: "with blank note", data: TEST_DATA.data.emptyNote },
        {
          case: "with blank bussiness staff",
          data: TEST_DATA.data.emptyBussinessStaff,
        },
        {
          case: "with blank text box not required",
          data: TEST_DATA.data.notRequire,
        },
      ];

      for (const scenario of invalidEmails) {
        test(`Add parent ${scenario.case}`, async ({ page, parentPage }) => {
          const user = scenario.data;
          await parentPage.addParent(
            user.name,
            user.email,
            user.phone,
            user.address,
            user.facebook,
            user.note,
            user.bussinessStaff
          );
          await expect(page.getByText("Thêm mới thành công.")).toBeVisible();
        });
      }
    });
  });

  test.describe("Edit Parent function", () => {
    test("Edit parent", async ({ page, parentPage }) => {
      const originalUser = TEST_DATA.data.user1;
      const updatedUser = TEST_DATA.data.updated;
      await parentPage.clickEditButton(originalUser.name);
      await fillField(parentPage.fullNameInput, updatedUser.name);
      await fillField(parentPage.emailInput, updatedUser.email);
      await fillField(parentPage.phoneInput, updatedUser.phone);
      await clearInputField(parentPage.noteInput);
      await page.waitForTimeout(TIMEOUTS.short);
      await clickElement(parentPage.acceptButton);
      // const value = await parentPage.noteInput.inputValue(); // check note field is cleared in DOM
      // expect(value).toBe("");

      //check dữ liệu đã được cập nhật thành công ở phía FE
      await expect(page.getByText("Cập nhật thành công")).toBeVisible();
      const noteCell = page
        .getByRole("row", { name: updatedUser.name })
        .locator("#note");
      await expect(noteCell).toHaveText("");
      await takeScreenshot(
        page,
        SCREENSHOT_PATHS.parent,
        filePaths.editSuccess
      );
    });
  });

  test("Delete parent function", async ({ page, parentPage }) => {
    await parentPage.clickDeleteButton(TEST_DATA.data.user2.name);
    await page.waitForTimeout(TIMEOUTS.short);
    await expect(page.getByText("Xóa bản ghi thành công")).toBeVisible();
    await takeScreenshot(
      page,
      SCREENSHOT_PATHS.parent,
      filePaths.deleteSuccess
    );
  });

  test("View parent details function", async ({ page, parentPage }) => {
    await parentPage.clickEyeButton("Lê Hoàng Nam");
    await waitAndScreenshot(
      page,
      TIMEOUTS.short,
      SCREENSHOT_PATHS.parent,
      filePaths.eyeClick
    );
  });

  test.describe("Approval status and approval functionality", () => {
    test("Add new parents and change approvals for 1 item", async ({
      page,
      parentPage,
    }) => {
      const user = TEST_DATA.data.user3;
      const rows = parentPage.bodyRows;

      // Add parent
      await parentPage.addParent(
        user.name,
        user.email,
        user.phone,
        user.address,
        user.facebook,
        user.note
      );

      // Change approval
      await clickElement(parentPage.approvedTag);
      await page.waitForTimeout(TIMEOUTS.medium);
      await page.getByRole("button", { name: "Có" }).click();

      // Verify success toast
      await expect(page.getByText("Cập nhật thành công")).toBeVisible();

      // Verify latest row buttons disabled
      const count = await rows.count();
      const { row } = getRowElements(rows, count - 1);
      await assertRowActions(row, true, count - 1);
    });

    test("Check not approved functionality for 1 item", async ({
      page,
      parentPage,
    }) => {
      const user = TEST_DATA.data.user3.name;
      await parentPage.notApprovedParent(user);
      await expect(page.getByText("Cập nhật thành công")).toBeVisible();
      // Verify buttons disabled for that row
      const rows = parentPage.bodyRows;
      const row = rows.filter({ hasText: user });
      await assertRowActions(row, false);
    });
    test("Should disable edit/delete buttons when parent is approved", async ({
      page,
      parentPage,
    }) => {
      const rows = parentPage.bodyRows;
      const count = await rows.count();
      await parentPage.browseAll();

      for (let i = 0; i < count; i++) {
        const { row } = getRowElements(rows, i);
        await assertRowActions(row, true, i);
      }
      //  Check cả 2 trạng thái
      // for (let i = 0; i < count; i++) {
      //   const { row } = getRowElements(rows, i);
      //   const isApproved =
      //     (await row.locator(parentPage.approvedTag).count()) > 0;
      //   await assertRowActions(row, isApproved, i);
      // }
      await expect(page.getByText("Cập nhật thành công")).toBeVisible();
    });

    test("If all are in approved status, click approve all again", async ({
      page,
      parentPage,
    }) => {
      const rows = parentPage.bodyRows;
      const count = await rows.count();
      await parentPage.browseAll();

      for (let i = 0; i < count; i++) {
        const { row } = getRowElements(rows, i);
        await assertRowActions(row, true, i);
      }
      await expect(
        page.getByText("Danh sách trống, không có mục nào để thao tác!")
      ).toBeVisible();
    });
  });
  test.describe("Export file Function", () => {
    test("Export and Verify Excel file", async ({ page, parentPage }) => {
      const filePath = TEST_DATA.excel.parents;
      await expect(parentPage.bodyRows.first()).toBeVisible();
      const uiRowCount = await parentPage.bodyRows.count();
      // console.log(`Số lượng dòng UI thực tế: ${uiRowCount}`);

      test.step("Download file", async () => {
        await downloadExcel(page, filePath, async () => {
          await clickElement(parentPage.excelButton);
        });
      });
      await page.waitForTimeout(TIMEOUTS.short);
      expect(fs.existsSync(filePath)).toBeTruthy();
      const stats = fs.statSync(filePath);
      expect(stats.size).toBeGreaterThan(0);

      test.step("Verify file", async () => {
        await verifyExcelDownload(filePath, {
          expectedColCount: 10,
          expectedRowCount: uiRowCount,
          ignoreHeader: true,
        });
      });
      await page.waitForTimeout(2000);
      fs.unlinkSync(filePath);
      // console.log(`Đã xóa file: ${filePath}`);
    });
  });

  test.describe("Search Funtion", () => {
    const openSearchAndClose = async (
      page: Page,
      parentPage: any,
      searchAction: () => Promise<void>
    ) => {
      await clickElement(parentPage.searchToggle);
      await searchAction();
      await clickElement(parentPage.drawerCloseButton);
    };

    const searchInput = [
      {
        name: "parent by code",
        value: TEST_DATA.search.parentCode,
        runSearch: (parentPage: any, value: string) =>
          parentPage.inputSearchText(value),
        locator: (page: Page, value: string) =>
          page.locator(".ant-table").getByText(value, { exact: true }),
        screenshot: filePaths.searchCode,
      },
      {
        name: "business staff",
        value: TEST_DATA.search.businessStaff,
        runSearch: (parentPage: any, value: string) =>
          parentPage.searchBussinessStaffName(value),
        locator: (page: Page, value: string) =>
          page.locator(".ant-table").getByText(value, { exact: true }),
      },
      {
        name: "approved status",
        value: TEST_DATA.status.approved,
        runSearch: (parentPage: any, value: string) =>
          parentPage.searchByStatus(value),
        locator: (page: Page, value: string) =>
          page.locator(".ant-table").getByText(value, { exact: true }),
        screenshot: filePaths.approved,
      },
      {
        name: "not approved status",
        value: TEST_DATA.status.notApproved,
        runSearch: (parentPage: any, value: string) =>
          parentPage.searchByStatus(value),
        locator: (page: Page, value: string) =>
          page.locator(".ant-table").getByText(value, { exact: true }),
        screenshot: filePaths.notApproved,
      },
    ];

    for (const item of searchInput) {
      test(`Search ${item.name}`, async ({ page, parentPage }) => {
        const noData = page.locator(".ant-empty-description");
        const allRows = item.locator(page, item.value);

        await openSearchAndClose(page, parentPage, async () => {
          await item.runSearch(parentPage, item.value);
        });

        await verifySearchResult(allRows, noData, async () => {
          await verifyItemTable(allRows);
          await expect(allRows).toHaveText(
            Array(await allRows.count()).fill(item.value)
          );

          if (item.screenshot) {
            await takeScreenshot(
              page,
              SCREENSHOT_PATHS.parent,
              item.screenshot
            );
          }
        });
      });
    }

    test("Search parent by create time", async ({ page, parentPage }) => {
      const { start, end } = TEST_DATA.search.dateRange;
      await openSearchAndClose(page, parentPage, async () => {
        await parentPage.searchTime(start, end);
        await parentPage.searchButton.click();
      });
      const rows = parentPage.bodyRows;
      const noData = page.locator(".ant-empty-description");
      if ((await rows.count()) > 0) {
        const startDate = new Date(start);
        const endDate = new Date(end);
        for (let i = 0; i < (await rows.count()); i++) {
          const row = rows.nth(i);
          const dateText = await row
            .locator("td:nth-last-child(1)")
            .innerText();
          // ^ locator tới cột "Thời gian tạo"
          const dateValue = parse(dateText, "dd/MM/yyyy", new Date());
          expect(
            isWithinInterval(dateValue, { start: startDate, end: endDate })
          ).toBeTruthy();
        }
      } else {
        await expect(noData).toBeVisible();
      }
    });
  });

  test.describe("Parent Page Pagination function", () => {
    const paginationOptions = TEST_DATA.pagination.options;
    paginationOptions.forEach((option) => {
      test(`Display ${option} rows per page`, async ({ parentPage }) => {
        await parentPage.setPagination(option.toString());
        await parentPage.page.waitForTimeout(TIMEOUTS.short);
        await parentPage.scrollTableToBottom();
        await parentPage.page.waitForTimeout(TIMEOUTS.short);
        await parentPage.checkRows(option);
        await takeScreenshot(
          parentPage.page,
          SCREENSHOT_PATHS.parent,
          `pagination-${option}.png`
        );
      });
    });
  });

  test("Reload data table function", async ({ page, parentPage }) => {
    await clickElement(parentPage.reloadButton);
    const loading = page.locator(".ant-spin");
    await expect(loading).toBeVisible();
    await expect(loading).toBeHidden();
    await expect(parentPage.bodyRows.first()).toBeVisible();
  });

  test("Logout from parent page", async ({ page, parentPage }) => {
    await clickElement(parentPage.accountIcon);
    await page.waitForTimeout(TIMEOUTS.short);
    await clickElement(parentPage.logoutIcon);
    await page.waitForTimeout(TIMEOUTS.short);
    await expect(
      page.locator("header").filter({ hasText: "Đăng nhập" })
    ).toBeVisible();
    await takeScreenshot(
      page,
      SCREENSHOT_PATHS.parent,
      filePaths.logoutSuccess
    );
  });
});
