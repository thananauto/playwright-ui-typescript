import { expect, type Page } from '@playwright/test'
import { Steps } from '@/utilities/stepdecorator'

export default class HomePage {
  readonly page: Page
  constructor(page: Page) {
    this.page = page
  }

  @Steps('Launch the app with {args}')
  async launchApp(url: any) {
    await this.page.goto(url)
    await expect(this.page.getByText('Swag Labs')).toBeVisible()
  }

  @Steps('Login with {username} and {password}')
  async login(username: string, password: string) {
    await this.page.locator('[data-test="username"]').fill(username)
    await this.page.locator('[data-test="password"]').fill(password)
    await this.page.getByRole('button', { name: 'Login', exact: true }).click()
    await expect(this.page.getByText('Swag Labs')).toBeVisible()
  }

  @Steps('Click on the Jacket')
  async clickJacket() {
    await this.page.getByTestId('inventory-item-name').filter({ hasText: 'Jacket' }).click()
    await expect(this.page.getByRole('button', { name: 'Back to products' })).toBeVisible()
  }
}
