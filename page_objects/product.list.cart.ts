import { type Page, expect } from '@playwright/test'
import { Steps } from '@/utilities/stepdecorator'

export default class ProductCartPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  @Steps('Validate the Product Info Page')
  async validateProductInfoPage() {
    await expect(this.page.getByTestId('inventory-item-name')).toBeVisible()
    await expect(this.page.getByTestId('inventory-item-desc')).toBeVisible()
    await expect(this.page.getByTestId('item-sauce-labs-backpack-img')).toBeVisible()
    await expect(this.page.getByTestId('inventory-item-price')).toBeVisible()
    await expect(this.page.getByTestId('add-to-cart')).toBeVisible()
    await expect(this.page.getByTestId('back-to-products')).toBeVisible()
  }

  @Steps('Click the Cart')
  async clickCart() {
    await this.page.getByTestId('shopping-cart-link').click()
    await expect(this.page.getByTestId('title')).toHaveText('Your Cart', {
      ignoreCase: false,
    })
  }

  @Steps('Remove item from Cart')
  async removeItemCart() {
    await this.page.getByRole('button', { name: 'Remove' }).click()
  }

  @Steps('Empty Cart')
  async emptyCart() {
    await expect(this.page.getByTestId('inventory-item')).not.toBeVisible()
    await expect(this.page.locator('.shopping_cart_badge')).not.toBeVisible()
  }
}
