import { type Page, expect } from "@playwright/test";
import exp from "constants";

export default class ProductCartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async validateProductInfoPage() {
    await expect(this.page.getByTestId("inventory-item-name")).toBeVisible();
    await expect(this.page.getByTestId("inventory-item-desc")).toBeVisible();
    await expect(
      this.page.getByTestId("item-sauce-labs-backpack-img"),
    ).toBeVisible();
    await expect(this.page.getByTestId("inventory-item-price")).toBeVisible();
    await expect(this.page.getByTestId("add-to-cart")).toBeVisible();
    await expect(this.page.getByTestId("back-to-products")).toBeVisible();
  }

  async clickCart() {
    await this.page.getByTestId("shopping-cart-link").click();
    await expect(this.page.getByTestId("title")).toHaveText("Your Cart", {
      ignoreCase: false,
    });
  }

  async removeItemCart() {
    await this.page.getByRole("button", { name: "Remove" }).click();
  }

  async emptyCart() {
    await expect(this.page.getByTestId("inventory-item")).not.toBeVisible();
    await expect(this.page.locator(".shopping_cart_badge")).not.toBeVisible();
  }
}
