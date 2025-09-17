import {
  clickElement,
  goToUrl,
  uploadImage,
} from "../utils/actions/actionsUtils";
import { notification, urls } from "../test_data/constants";
import { expect } from "@playwright/test";
import { test } from "../fixtures/fixtures";
import { DATA_STUDENT } from "../test_data/studentData";
import path from "path";

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
          { case: "full name", data: DATA_STUDENT.student.blank.FullName },
          { case: "class", data: DATA_STUDENT.student.blank.Class },
          { case: "fee", data: DATA_STUDENT.student.blank.Fee },
          {
            case: "fee payment cycle",
            data: DATA_STUDENT.student.blank.feePaymentCycle,
          },
          {
            case: "payment date",
            data: DATA_STUDENT.student.blank.paymentDate,
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
          const student3 = DATA_STUDENT.student.blank.Email;
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
      test.describe.only("invalid Email", async () => {
        const invalidEmail = [
          {
            case: "lack @",
            data: DATA_STUDENT.student.invalid.InvalidEmail_MissingAt,
          },
          {
            case: "lack domain",
            data: DATA_STUDENT.student.invalid.InvalidEmail_MissingDomain,
          },
          {
            case: "lack username",
            data: DATA_STUDENT.student.invalid.InvalidEmail_MissingUsername,
          },
          {
            case: "invalid character",
            data: DATA_STUDENT.student.invalid.InvalidEmail_InvalidChars,
          },
          { case: "lack .com", data: DATA_STUDENT.student.invalid.InvalidEmail_NoTLD },
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

      test("Add student success with picture", async ({
        page,
        studentPage,
      }) => {
        const student2 = DATA_STUDENT.student.student2;
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
    });
  });
});
