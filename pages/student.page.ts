import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../basePage/basePage";
import {
  clickElement,
  uploadImage,
  selectDropdownOption,
} from "../utils/actions/actionsUtils";
import { clickCreateTime, clickDate } from "../utils/date/datePickerUtils";
import {
  selectPaginationOption,
  verifyRowsPerPage,
} from "../utils/actions/paginationUtils";
import { scrollToBottom } from "../utils/actions/scrollUtils";
import path from "path";

export class StudentPage extends BasePage {
  // Form
  readonly choosePictureBtn: Locator;
  readonly fullName: Locator;
  readonly email: Locator;
  readonly classRoom: Locator;
  readonly fee: Locator;
  readonly feePaymentCycle: Locator;
  readonly paymentDate: Locator;
  readonly fileInput: Locator;
  readonly dob: Locator;
  readonly gradeLevel: Locator;
  readonly paymentMethod: Locator;
  readonly parent: Locator;
  readonly businessStaff: Locator;

  //search
  readonly createTimeInput: Locator;
  constructor(page: Page) {
    super(page);
    this.fullName = page.locator("#full_name");
    this.dob = page.locator("#dob");
    this.email = page.locator("#email");
    this.classRoom = page.locator("#class");
    this.gradeLevel = page.locator("#grade_level");
    this.fee = page.locator("#tuition_fee");
    this.feePaymentCycle = page.locator("#tuition_term");
    this.paymentDate = page.locator("#last_payment_date");
    this.paymentMethod = page.locator("#payment_method");
    this.choosePictureBtn = page.getByRole("button", {
      name: "upload Chọn hình ảnh",
    });
    this.fileInput = page.locator("#images");
    this.parent = page.locator("#parent");
    this.businessStaff = page.locator("#business_staff");
    this.createTimeInput = page.getByRole("textbox", { name: "Thời gian tạo" });
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
  async chooseImage(filePath?: string) {
    if (filePath) {
      await clickElement(this.choosePictureBtn);
      await uploadImage(this.fileInput, filePath);
    }
  }

  async addStudent(
    fullName: string,
    email: string,
    classOption: string,
    fee: string,
    feePaymentCycleOption: string,
    paymentDate: string,
    filePaths?: string
  ) {
    await clickElement(this.addButton);
    await this.fullName.fill(fullName);
    await this.email.fill(email);
    if (classOption) {
      await selectDropdownOption(this.classRoom, classOption, this.page);
    }
    await this.fee.fill(fee);
    if (feePaymentCycleOption) {
      await selectDropdownOption(
        this.feePaymentCycle,
        feePaymentCycleOption,
        this.page
      );
    }
    if (paymentDate) {
      await clickDate(this.page, this.paymentDate, paymentDate);
    }

    await this.chooseImage(filePaths);
    // const uploadedItem = this.page.locator(".ant-upload-list-item");
    // await expect(uploadedItem.first()).toBeVisible({ timeout: 5000 });

    await clickElement(this.acceptButton);
    await expect(this.bodyRows.first()).toBeVisible();
  }
  async fillStudentForm(
    fullName: string,
    dob: string,
    email: string,
    classOption: string,
    gradeLevel: string,
    fee: string,
    feePaymentCycleOption: string,
    paymentDate: string,
    paymentMethod: string,
    filePaths: string,
    parent: string,
    businessStaff: string
  ) {
    await this.fullName.fill(fullName);
    if (dob) await clickDate(this.page, this.dob, dob);
    await this.email.fill(email);
    await selectDropdownOption(this.classRoom, classOption, this.page);
    if (gradeLevel) await this.gradeLevel.fill(gradeLevel);
    await this.fee.fill(fee);
    await selectDropdownOption(
      this.feePaymentCycle,
      feePaymentCycleOption,
      this.page
    );
    await clickDate(this.page, this.paymentDate, paymentDate);
    if (paymentMethod)
      await selectDropdownOption(this.paymentMethod, paymentMethod, this.page);

    if (filePaths) {
      const absolutePath = path.resolve(__dirname, filePaths);
      await this.chooseImage(absolutePath);
    }

    if (parent) await selectDropdownOption(this.parent, parent, this.page);
    if (businessStaff)
      await selectDropdownOption(this.businessStaff, businessStaff, this.page);
  }
}
