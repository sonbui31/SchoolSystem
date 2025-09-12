import { expect, Locator, Page } from "@playwright/test";

import {
  clickElement,
  selectDropdownOption,
} from "../utils/actions/actionsUtils";
import {
  selectPaginationOption,
  verifyRowsPerPage,
} from "../utils/actions/paginationUtils";
import { clickCreateTime } from "../utils/date/datePickerUtils";
import { scrollToBottom } from "../utils/actions/scrollUtils";

export class ParentPage {
  page: Page;

  // ========== Header ==========
  readonly accountIcon: Locator;
  readonly logoutIcon: Locator;

  // ========== Table ==========
  readonly bodyRows: Locator;
  readonly pagination: Locator;
  readonly dropDown: Locator;
  readonly tableBody: Locator;

  // ========== Actions ==========
  readonly addButton: Locator;
  readonly acceptButton: Locator;
  readonly closeButton: Locator;
  readonly excelButton: Locator;
  readonly browseAllButton: Locator;
  readonly reloadButton: Locator;

  // ========== Status ==========
  readonly approvedTag: Locator;
  readonly notApprovedTag: Locator;

  // ========== Form ==========
  readonly fullNameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly noteInput: Locator;
  readonly addressInput: Locator;
  readonly facebookInput: Locator;
  readonly businessStaffCombo: Locator;

  // ========== Search ==========
  readonly searchToggle: Locator;
  readonly searchButton: Locator;
  readonly parentCodeInput: Locator;
  readonly businessStaffCodeCombo: Locator;
  readonly statusCombo: Locator;
  readonly createTimeInput: Locator;

  // ========== Drawer/Modal ==========
  readonly drawerCloseButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Header
    this.accountIcon = page.getByRole("button", { name: "user" });
    this.logoutIcon = page.getByText("Đăng xuất");

    // Table
    this.tableBody = page.locator(".ant-table-body");
    this.bodyRows = page.locator(".ant-table-row");
    this.pagination = page.locator(".ant-select-selection-item", {
      hasText: "/ page",
    });
    this.dropDown = page.locator(".ant-select-dropdown");

    // Actions
    this.addButton = page.getByRole("button", { name: "plus-circle Thêm mới" });
    this.acceptButton = page.getByRole("button", {
      name: "check",
      exact: true,
    });
    this.closeButton = page.getByRole("button", { name: "close", exact: true });
    this.excelButton = page.getByRole("button", {
      name: "download Xuất Excel",
    });
    this.browseAllButton = page.getByRole("button", {
      name: "check-circle Duyệt tất cả",
    });
    this.reloadButton = page.getByRole("button", {
      name: "reload Tải lại dữ liệu",
    });

    // Status
    this.approvedTag = page.locator(".ant-tag").first();
    this.notApprovedTag = page.getByText("Chưa duyệt");

    // Form
    this.fullNameInput = page.locator("#full_name");
    this.emailInput = page.locator("#email");
    this.phoneInput = page.locator("#phone_number");
    this.noteInput = page.locator("#note");
    this.addressInput = page.locator("#address");
    this.facebookInput = page.locator("#fb");
    this.businessStaffCombo = page.locator("#business_staff");

    // Search
    this.searchToggle = page.getByRole("button", {
      name: "search Hiện tìm kiếm",
    });
    this.searchButton = page.getByRole("button", {
      name: "Tìm kiếm",
      exact: true,
    });
    this.parentCodeInput = page.locator("#code");

    this.businessStaffCodeCombo = page.getByRole("combobox", {
      name: "Mã CV kinh doanh",
    });
    this.statusCombo = page.locator("#approval");
    this.createTimeInput = page.getByRole("textbox", { name: "Thời gian tạo" });

    // Drawer
    this.drawerCloseButton = page.locator(".ant-drawer-close");
  }
  async setPagination(value: string) {
    await selectPaginationOption(this.pagination, this.dropDown, value);
  }
  async checkRows(expected: number) {
    await verifyRowsPerPage(this.bodyRows, expected);
  }
  async searchTime(start: string, end: string) {
    await clickCreateTime(this.page, this.createTimeInput, start, end);
  }
  async scrollTableToBottom() {
    await scrollToBottom(this.page, this.tableBody);
  }
  async browseAll() {
    await clickElement(this.browseAllButton);
    await this.page.getByRole("button", { name: "Có" }).click();
  }
  async addParent(
    fullName: string,
    email: string,
    phone: string,
    address: string,
    facebook: string,
    note: string,
    optionText?: string
  ) {
    await expect(this.bodyRows.first()).toBeVisible();
    await expect(this.addButton).toBeEnabled();
    await clickElement(this.addButton);
    await this.fullNameInput.fill(fullName);
    await this.emailInput.fill(email);
    await this.phoneInput.fill(phone);
    await this.noteInput.fill(note);
    await this.addressInput.fill(address);
    await this.facebookInput.fill(facebook);

    if (optionText) {
      await selectDropdownOption(
        this.businessStaffCombo,
        optionText,
        this.page
      );
    }
    await clickElement(this.acceptButton);
  }
  async editParent(
    identifier: string, // có thể là Mã phụ huynh hoặc Tên để tìm row
    fullName: string,
    email: string,
    phone: string,
    address: string,
    facebook: string,
    note: string,
    optionText?: string
  ) {
    // 1. Tìm row chứa identifier
    const row = this.bodyRows.filter({ hasText: identifier }).first();
    await expect(row).toBeVisible();

    // 2. Click nút edit trong row đó
    const editButton = row.getByRole("button", { name: "edit" });
    await clickElement(editButton);

    // 3. Fill lại thông tin
    await this.fullNameInput.fill(fullName);
    await this.emailInput.fill(email);
    await this.phoneInput.fill(phone);
    await this.noteInput.fill(note);
    await this.addressInput.fill(address);
    await this.facebookInput.fill(facebook);

    if (optionText) {
      await selectDropdownOption(
        this.businessStaffCombo,
        optionText,
        this.page
      );
    }

    // 4. Lưu
    await clickElement(this.acceptButton);
  }

  async clickDeleteButton(name: string) {
    const deleteButton = this.page
      .getByRole("row", { name })
      .getByRole("button")
      .nth(1);
    await clickElement(deleteButton);
    await this.page.getByRole("button", { name: "Yes" }).click();
  }

  async clickEditButton(name: string) {
    const editButton = this.page
      .getByRole("row", { name })
      .getByRole("button")
      .nth(0);
    await clickElement(editButton);
  }

  async clickEyeButton(name: string) {
    await this.page
      .getByRole("row", { name })
      .getByRole("button")
      .nth(2)
      .click();

    // Đợi modal hiển thị
    await expect(
      this.page.getByText(`Danh sách con/em của phụ huynh ${name}`)
    ).toBeVisible();

    // Lấy số trong badge
    const badgeCountText = await this.page
      .locator(".ant-badge-count")
      .innerText();
    const badgeCount = Number(badgeCountText.trim()) || 0;

    // Đếm số item .ant-card-body
    const items = this.page.locator(".ant-modal-body .ant-card-body");
    // console.log("số item:", await items.count());
    await expect(items).toHaveCount(badgeCount);
  }
  async notApprovedParent(name: string) {
    const row = this.page.getByRole("row", { name });
    const approvedBtn = this.approvedTag;
    await expect(row.locator(approvedBtn)).toBeVisible();
    await clickElement(approvedBtn);
    await this.page.getByRole("button", { name: "Có" }).click();
  }

  async inputSearchText(text: string) {
    await this.parentCodeInput.fill(text);
    await clickElement(this.searchButton);
    await expect(this.page.getByText(text)).toBeVisible();
  }

  async searchBussinessStaffName(name: string) {
    if (name) {
      await selectDropdownOption(this.businessStaffCodeCombo, name, this.page);
    }
    await clickElement(this.searchButton);
  }
  async searchByStatus(status: string) {
    await selectDropdownOption(this.statusCombo, status, this.page);
    await clickElement(this.searchButton);
  }
  async excelButtonClick() {
    await expect(this.bodyRows.first()).toBeVisible(),
      await clickElement(this.excelButton);
  }
}
