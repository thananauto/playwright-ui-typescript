import { expect, type Page, type Locator } from "@playwright/test";
import exp from "constants";

export default class HomePage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async launchApp(url: any) {
    await this.page.goto(url);
    await expect(this.page.getByText("Swag Labs")).toBeVisible();
  }

  async login(username: string, password: string) {
    await this.page.locator('[data-test="username"]').fill(username);
    await this.page.locator('[data-test="password"]').fill(password);
    await this.page.getByRole("button", { name: "Login", exact: true }).click();
    await expect(this.page.getByText("Swag Labs")).toBeVisible();
  }

  async clickJacket() {
    await this.page
      .getByTestId("inventory-item-name")
      .filter({ hasText: "Jacket" })
      .click();
    await expect(
      this.page.getByRole("button", { name: "Back to products" }),
    ).toBeVisible();
  }
}
