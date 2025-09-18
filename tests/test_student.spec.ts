import {
  clickElement,
  goToUrl,
  selectDropdownOption,
} from "../utils/actions/actionsUtils";
import {
  notification,
  pagination,
  TIMEOUTS,
  urls,
} from "../test_data/constants";
import { expect } from "@playwright/test";
import { test } from "../fixtures/fixtures";
import { DATA_STUDENT } from "../test_data/studentData";
import path from "path";
import { clickDate } from "../utils/date/datePickerUtils";
import { expectOnlyValidChars } from "../utils/actions/inputActionsUtils";

test.use({ storageState: "auth.json" });
test.describe("Student management", async () => {
  test.beforeEach(async ({ studentPage }) => {
    await goToUrl(studentPage.page, urls.student);
    await expect(studentPage.bodyRows.first()).toBeVisible();
  });
  test.describe("Functions of Student Management", async () => {
    test.describe("Add student function", async () => {
      test.describe("Required input fields", async () => {
        const blankInput = [
          { case: "full name", data: DATA_STUDENT.blank.FullName },
          { case: "class", data: DATA_STUDENT.blank.Class },
          { case: "fee", data: DATA_STUDENT.blank.Fee },
          {
            case: "fee payment cycle",
            data: DATA_STUDENT.blank.feePaymentCycle,
          },
          {
            case: "payment date",
            data: DATA_STUDENT.blank.paymentDate,
          },
        ];
        for (const item of blankInput) {
          test(`Leave the ${item.case} textbox blank`, async ({
            page,
            studentPage,
          }) => {
            const data = item.data;
            await studentPage.addStudent(
              data.fullName,
              data.email,
              data.class,
              data.fee,
              data.feePaymentCycle,
              data.paymentDate
            );
            await expect(page.getByText(notification.errorInput)).toBeVisible();
          });
        }
        test("Leave the email text box blank", async ({
          page,
          studentPage,
        }) => {
          const student3 = DATA_STUDENT.blank.Email;
          await studentPage.addStudent(
            student3.fullName,
            student3.email,
            student3.class,
            student3.fee,
            student3.feePaymentCycle,
            student3.paymentDate
          );
          await expect(page.getByText(notification.errorEmail)).toBeVisible();
        });
      });

      test.describe("Invalid Email", async () => {
        const invalidEmail = [
          {
            case: "lack @",
            data: DATA_STUDENT.invalidEmail.missingAt,
          },
          {
            case: "lack domain",
            data: DATA_STUDENT.invalidEmail.missingDomain,
          },
          {
            case: "lack username",
            data: DATA_STUDENT.invalidEmail.missingUsername,
          },
          {
            case: "invalid character",
            data: DATA_STUDENT.invalidEmail.invalidChars,
          },
          {
            case: "lack .com",
            data: DATA_STUDENT.invalidEmail.noTLD,
          },
        ];
        for (const item of invalidEmail) {
          test(`Enter an ${item.case} in the email field`, async ({
            page,
            studentPage,
          }) => {
            const data = item.data;
            await studentPage.addStudent(
              data.fullName,
              data.email,
              data.class,
              data.fee,
              data.feePaymentCycle,
              data.paymentDate
            );
            await expect(page.getByText(notification.errorEmail)).toBeVisible({
              timeout: 5000,
            });
          });
        }
      });

      test.describe("Space at both ends of the input require textbox", async () => {
        const space = [
          {
            case: "full name",
            data: DATA_STUDENT.space.fullName,
          },
          {
            case: "email",
            data: DATA_STUDENT.space.email,
          },
          {
            case: "class",
            data: DATA_STUDENT.space.class,
          },
          {
            case: "fee",
            data: DATA_STUDENT.space.fee,
          },
          {
            case: "feePaymentCycle",
            data: DATA_STUDENT.space.feePaymentCycle,
          },
        ];
        for (const item of space) {
          test(`Space at both ends of the input ${item.case} textbox`, async ({
            page,
            studentPage,
          }) => {
            const data = item.data;
            await studentPage.addStudent(
              data.fullName,
              data.email,
              data.class,
              data.fee,
              data.feePaymentCycle,
              data.paymentDate
            );
            await expect(page.getByText(notification.success)).toBeVisible({
              timeout: 5000,
            });
          });
        }
      });

      test("Add student success with picture", async ({
        page,
        studentPage,
      }) => {
        const student2 = DATA_STUDENT.studentWithPicture;
        const filePath = path.resolve(__dirname, student2.filePaths);
        await studentPage.addStudent(
          student2.fullName,
          student2.email,
          student2.class,
          student2.fee,
          student2.feePaymentCycle,
          student2.paymentDate,
          filePath
        );
        await expect(page.getByText(notification.success)).toBeVisible();
      });

      test("Add student with full information", async ({
        page,
        studentPage,
      }) => {
        const data = DATA_STUDENT.studentFullInfor;
        const filePath = path.resolve(__dirname, data.filePaths);
        await expect(studentPage.bodyRows.first()).toBeVisible();
        await clickElement(studentPage.addButton);
        await studentPage.fullName.fill(data.fullName);
        await clickDate(studentPage.page, studentPage.dob, data.dob);
        await studentPage.email.fill(data.email);
        await selectDropdownOption(
          studentPage.classRoom,
          data.class,
          studentPage.page
        );
        await studentPage.gradeLevel.fill(data.gradeLevel),
          await studentPage.fee.fill(data.fee);
        await selectDropdownOption(
          studentPage.feePaymentCycle,
          data.feePaymentCycle,
          studentPage.page
        );
        await clickDate(
          studentPage.page,
          studentPage.paymentDate,
          data.paymentDate
        );
        await selectDropdownOption(
          studentPage.paymentMethod,
          data.paymentMethod,
          studentPage.page
        );
        await studentPage.chooseImage(filePath);
        await selectDropdownOption(
          studentPage.parent,
          data.parent,
          studentPage.page
        );
        await selectDropdownOption(
          studentPage.businessStaff,
          data.bussinessStaff,
          studentPage.page
        );
        await clickElement(studentPage.acceptButton);
        await expect(page.getByText(notification.success)).toBeVisible({
          timeout: 3000,
        });
      });

      test("Add students with special characters in the number input box", async ({
        page,
        studentPage,
      }) => {
        const data = DATA_STUDENT.studentSpecialCharacters;
        const filePath = path.resolve(__dirname, data.filePaths);
        await expect(studentPage.bodyRows.first()).toBeVisible();
        await clickElement(studentPage.addButton);
        await studentPage.fullName.fill(data.fullName);
        await clickDate(studentPage.page, studentPage.dob, data.dob);
        await studentPage.email.fill(data.email);
        await selectDropdownOption(
          studentPage.classRoom,
          data.class,
          studentPage.page
        );
        await studentPage.gradeLevel.fill(data.gradeLevel);
        await studentPage.fee.fill(data.fee);
        await selectDropdownOption(
          studentPage.feePaymentCycle,
          data.feePaymentCycle,
          studentPage.page
        );
        await clickDate(
          studentPage.page,
          studentPage.paymentDate,
          data.paymentDate
        );
        await selectDropdownOption(
          studentPage.paymentMethod,
          data.paymentMethod,
          studentPage.page
        );
        await studentPage.chooseImage(filePath);
        await selectDropdownOption(
          studentPage.parent,
          data.parent,
          studentPage.page
        );
        await selectDropdownOption(
          studentPage.businessStaff,
          data.bussinessStaff,
          studentPage.page
        );
        await expectOnlyValidChars(
          page,
          studentPage.gradeLevel,
          data.gradeLevel
        );
        await expectOnlyValidChars(page, studentPage.fee, data.fee);
        await clickElement(studentPage.acceptButton);
        await expect(page.getByText(notification.success)).toBeVisible({
          timeout: 3000,
        });
      });
    });

    test.describe("Student Page Pagination function", () => {
      const paginationOptions = pagination.options;
      paginationOptions.forEach((option) => {
        test(`Display ${option} rows per page`, async ({ studentPage }) => {
          await studentPage.setPagination(option.toString());
          await studentPage.page.waitForTimeout(TIMEOUTS.short);
          await studentPage.scrollTableToBottom();
          await studentPage.page.waitForTimeout(TIMEOUTS.short);
          await studentPage.checkRows(option);
        });
      });
    });

    test("Reload data table function", async ({ page, studentPage }) => {
      await clickElement(studentPage.reloadButton);
      const loading = page.locator(".ant-spin");
      await expect(loading).toBeVisible();
      await expect(loading).toBeHidden();
      await expect(studentPage.bodyRows.first()).toBeVisible();
    });
  });
});
