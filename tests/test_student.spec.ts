import {
  clickElement,
  goToUrl,
  uploadImage,
} from "../utils/actions/actionsUtils";
import { notification, urls } from "../test_data/constants";
import { expect, Page } from "@playwright/test";
import { test } from "../fixtures/fixtures";
import path from "path";
import { TEST_DATA } from "../test_data/parentData";

test.use({ storageState: "auth.json" });
test.describe("Student management", async () => {
  test.beforeEach(async ({ studentPage }) => {
    await goToUrl(studentPage.page, urls.student);
    await expect(studentPage.bodyRows.first()).toBeVisible();
  });
  test.describe("Functions of Student Management", async () => {
    test.describe("Add student function", async () => {
      
      test("Add student wiht the picture", async ({ page, studentPage }) => {
        const student = TEST_DATA.student;
        const filePath = path.resolve(__dirname, student.filePaths);
        // // const filePath = path.resolve(
        // //   __dirname,
        // //   "C:/Users/buing/Downloads/student.jpg"
        // // );
        await studentPage.addStudent(
          student.fullName,
          student.email,
          student.class,
          student.fee,
          student.feePaymentCycle,
          student.paymentDate,
          filePath
        );
        await expect(page.getByText(notification.success)).toBeVisible();
      });
    });
  });
});
