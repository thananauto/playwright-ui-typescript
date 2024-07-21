import { type Page, expect } from "@playwright/test";

export default class Checkout {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickCheckout() {
    await this.page.getByTestId("checkout").click();
  }

  async enterAddress(firstname: string, lastname: string, postcode: string) {
    await this.page.getByTestId("firstName").fill(firstname);
    await this.page.getByTestId("lastName").fill(lastname);
    await this.page.getByTestId("postalCode").fill(postcode);
    await this.page.getByRole("button", { name: "Continue" }).click();
  }

  async checkoutOverview() {
    await expect(this.page.getByTestId("payment-info-label")).toBeVisible();
    await expect(this.page.getByTestId("shipping-info-label")).toBeVisible();
    await expect(this.page.getByTestId("total-info-label")).toBeVisible();
  }

  async finishCheckout() {
    await this.page.getByRole("button", { name: "Finish" }).click();
  }

  async orderCompletion() {
    await expect(this.page.getByTestId("complete-header")).toHaveText(
      "Thank you for your order!",
      { ignoreCase: true },
    );
    await expect(this.page.getByTestId("title")).toHaveText(
      "Checkout: Complete!",
      { ignoreCase: true },
    );
    await expect(
      this.page.getByRole("button", { name: /Back Home/ }),
    ).toBeVisible();
  }
}
