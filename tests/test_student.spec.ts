import {
  clickElement,
  goToUrl,
  uploadImage,
} from "../utils/actions/actionsUtils";
import { notification, urls } from "../test_data/constants";
import { expect } from "@playwright/test";
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
      test("Add student blank full name", async ({ page, studentPage }) => {
        const student1 = TEST_DATA.student.blankFullName;
        // const filePath = path.resolve(__dirname, student.filePaths);
        // // const filePath = path.resolve(
        // //   __dirname,
        // //   "C:/Users/buing/Downloads/student.jpg"
        // // );
        await studentPage.addStudent(
          student1.fullName,
          student1.email,
          student1.class,
          student1.fee,
          student1.feePaymentCycle,
          student1.paymentDate
        );
        await expect(page.getByText(notification.errorInput)).toBeVisible();
      });
      test("Add student wiht the picture", async ({ page, studentPage }) => {
        const student2 = TEST_DATA.student.student1;
        const filePath = path.resolve(__dirname, student2.filePaths);
        // // const filePath = path.resolve(
        // //   __dirname,
        // //   "C:/Users/buing/Downloads/student.jpg"
        // // );
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
      test.only("Add student blank class", async ({ page, studentPage }) => {
        const student3 = TEST_DATA.student.student3;
        // const filePath = path.resolve(__dirname, student.filePaths);
        // // const filePath = path.resolve(
        // //   __dirname,
        // //   "C:/Users/buing/Downloads/student.jpg"
        // // );
        await studentPage.addStudent(
          student3.fullName,
          student3.email,
          student3.class,
          student3.fee,
          student3.feePaymentCycle,
          student3.paymentDate
        );
        await expect(page.getByText(notification.success)).toBeVisible();
      });
    });
  });
});