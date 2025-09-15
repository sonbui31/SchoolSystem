import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { ParentPage } from "../pages/parent.page";
import { StudentPage } from "../pages/student.page";
export { expect } from "@playwright/test";
export const username = "admin@gmail.com";
export const password = "JQK192.168a23";

type MyFixtures = {
  loginPage: LoginPage;
  parentPage: ParentPage;
  studentPage: StudentPage;
};
export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  parentPage: async ({ page }, use) => {
    const parentPage = new ParentPage(page);
    await use(parentPage);
  },
  studentPage: async ({ page }, use) => {
    const studentPage = new StudentPage(page);
    await use(studentPage);
  }
});