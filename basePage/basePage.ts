import { Locator, Page } from "@playwright/test";

export class BasePage {
  readonly page: Page;
  // ========== Actions ==========
  readonly addButton: Locator;
  readonly acceptButton: Locator;
  readonly closeButton: Locator;
  readonly excelButton: Locator;
  readonly browseAllButton: Locator;
  readonly reloadButton: Locator;
  readonly searchToggle: Locator;
  readonly searchButton: Locator;
  readonly approvedTag: Locator;
  readonly notApprovedTag: Locator;
  // ========== Header ==========
  readonly accountIcon: Locator;
  readonly logoutIcon: Locator;

  // ========== Table ==========
  readonly bodyRows: Locator;
  readonly pagination: Locator;
  readonly dropDown: Locator;
  readonly tableBody: Locator;

  constructor(page: Page) {
    this.page = page;
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
    this.searchToggle = page.getByRole("button", {
      name: "search Hiện tìm kiếm",
    });
    this.searchButton = page.getByRole("button", {
      name: "Tìm kiếm",
      exact: true,
    });
    this.approvedTag = page.locator(".ant-tag").first();
    this.notApprovedTag = page.getByText("Chưa duyệt");
    this.accountIcon = page.getByRole("button", { name: "user" });
    this.logoutIcon = page.getByText("Đăng xuất");

    // Table
    this.tableBody = page.locator(".ant-table-body");
    this.bodyRows = page.locator(".ant-table-row");
    this.pagination = page.locator(".ant-select-selection-item", {
      hasText: "/ page",
    });
    this.dropDown = page.locator(".ant-select-dropdown");
  }
}
