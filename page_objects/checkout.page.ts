import { type Page, expect } from '@playwright/test'
import { Steps } from '@/utilities/stepdecorator'

export default class Checkout {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  @Steps('Click the checkout button')
  async clickCheckout() {
    await this.page.getByTestId('checkout').click()
  }
  @Steps('Enter the address with {firstname}, {lastname} and {postcode}')
  async enterAddress(firstname: string, lastname: string, postcode: string) {
    await this.page.getByTestId('firstName').fill(firstname)
    await this.page.getByTestId('lastName').fill(lastname)
    await this.page.getByTestId('postalCode').fill(postcode)
    await this.page.getByRole('button', { name: 'Continue' }).click()
  }

  @Steps('Checkout overview')
  async checkoutOverview() {
    await expect(this.page.getByTestId('payment-info-label')).toBeVisible()
    await expect(this.page.getByTestId('shipping-info-label')).toBeVisible()
    await expect(this.page.getByTestId('total-info-label')).toBeVisible()
  }

  @Steps('Finish the checkout')
  async finishCheckout() {
    await this.page.getByRole('button', { name: 'Finish' }).click()
  }

  @Steps('Order completion')
  async orderCompletion() {
    await expect(this.page.getByTestId('complete-header')).toHaveText('Thank you for your order!', { ignoreCase: true })
    await expect(this.page.getByTestId('title')).toHaveText('Checkout: Complete!', { ignoreCase: true })
    await expect(this.page.getByRole('button', { name: /Back Home/ })).toBeVisible()
  }
}
