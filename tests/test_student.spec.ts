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
          { case: "full name", data: DATA_STUDENT.student.blankFullName },
          { case: "class", data: DATA_STUDENT.student.blankClass },
          { case: "fee", data: DATA_STUDENT.student.blankFee },
          {
            case: "fee payment cycle",
            data: DATA_STUDENT.student.blankfeePaymentCycle,
          },
          { case: "payment date", data: DATA_STUDENT.student.blankpaymentDate },
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
          const student3 = DATA_STUDENT.student.blankEmail;
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
      test("Add student with picture", async ({ page, studentPage }) => {
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
