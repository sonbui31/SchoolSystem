import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../basePage/basePage";
import {
  clickElement,
  uploadImage,
  selectDropdownOption,
} from "../utils/actions/actionsUtils";
import { clickDate } from "../utils/date/datePickerUtils";

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
  constructor(page: Page) {
    super(page);
    this.fullName = page.locator("#full_name");
    this.email = page.locator("#email");
    this.classRoom = page.locator("#class");
    this.fee = page.locator("#tuition_fee");
    this.feePaymentCycle = page.locator("#tuition_term");
    this.paymentDate = page.locator("#last_payment_date");
    this.choosePictureBtn = page.getByRole("button", {
      name: "upload Chọn hình ảnh",
    });
    this.fileInput = page.locator("#images");
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
}
