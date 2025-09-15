import {
  clickElement,
  goToUrl,
  uploadImage,
} from "../utils/actions/actionsUtils";
import { notification, urls } from "../test_data/constants";
import { expect, Page } from "@playwright/test";
import { test } from "../fixtures/fixtures";
import path from "path";

test.use({ storageState: "auth.json" });
test.describe("Student manage", async () => {
  test.beforeEach(async ({ studentPage }) => {
    await goToUrl(studentPage.page, urls.student);
    await expect(studentPage.bodyRows.first()).toBeVisible();
  });
  test("done", async ({ page, studentPage }) => {
    const filePath = path.resolve(__dirname, "../assets/student.jpg");

    // // const filePath = path.resolve(
    // //   __dirname,
    // //   "C:/Users/buing/Downloads/student.jpg"
    // // );
    await studentPage.addStudent(
      "Sơn",
      "test@gmail.com",
      "Lớp toán nâng cao",
      "1000000",
      "1 tháng",
      "2025-09-01",
      filePath
    );
    await expect(page.getByText(notification.success)).toBeVisible();
  });
});
