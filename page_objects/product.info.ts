import { expect, type Page, type Locator, request } from "@playwright/test";

export default class ProductInfo {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async validateRemoveOrAddToCart() {
    const addToCart = this.page.getByRole("button", { name: "Add to cart" });
    const removeButton = this.page.getByRole("button", { name: "Add to cart" });
    //check either 'Add to cart' or 'Remove' button present on each item
    const buttons = await addToCart.or(removeButton).all();
    buttons.forEach(async (ele) => await expect.soft(ele).toBeVisible());
  }

  async validateAllItemsHavePrice() {
    //all products have the $ price symbol
    for (const li of await this.page
      .locator(".inventory_item")
      .getByTestId("inventory-item-price")
      .all())
      await expect.soft(li).toHaveText(/\$\d{1,3}\.\d{0,2}/);
  }

  async validateAllHaveValidImages() {
    //get all images
    const images = await this.page.locator("img.inventory_item_img").all();

    let imgUrl = await Promise.all(
      images.map(async (eacItem) => {
        const url: string | any = await eacItem.getAttribute("src");
        return process.env.URL + url;
      }),
    );
    //validate each url response code
    const context = await request.newContext();
    await Promise.all(
      imgUrl.map(async (eachUrl) => {
        const eachUrlStatus = await context.get(eachUrl);
        expect(eachUrlStatus.ok()).toBeTruthy();
      }),
    );
  }

  async validateLowToHighPrice() {
    await this.page
      .locator('[data-test="product-sort-container"]')
      .selectOption("Price (low to high)");
    await expect(this.page.getByTestId("active-option")).toHaveText(
      "Price (low to high)",
      { ignoreCase: true },
    );
  }

  async clickAnItem(item: string) {
    const product = this.page
      .locator(".inventory_item", { hasText: item })
      .getByRole("button", { name: "Add to cart" });
    await product.click();
  }
}
