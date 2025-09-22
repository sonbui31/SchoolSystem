import { Page, Locator } from "@playwright/test";
import { clickElement } from "../utils/actions/actionsUtils";
import { fillField } from "../utils/actions/inputActionsUtils";
import { urls } from "../testData/constants";
import { time } from "console";
export class LoginPage {
  page: Page;
  readonly username_textbox: Locator;
  readonly password_textbox: Locator;
  readonly login_button: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username_textbox = page.getByRole("textbox", { name: "Nhập Email" });
    this.password_textbox = page.getByRole("textbox", {
      name: "Nhập Password",
    });
    this.login_button = page.getByRole("button", { name: "Đăng nhập" });
  }

  async login(username: string, password: string) {
    await this.page.goto(urls.login);
    await fillField(this.username_textbox, username);
    await fillField(this.password_textbox, password);
    await clickElement(this.login_button);
  }
}
