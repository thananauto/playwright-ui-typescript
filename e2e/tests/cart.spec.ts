import { test, expect } from '@utilities/fixture'

test.describe('Cart item page validation', () => {
  let data: any
  test.beforeEach(async ({ readData, homePage }) => {
    data = readData.getFile()
    await homePage.launchApp(process.env.URL)
    await homePage.login(data['credentials']['username'], data['credentials']['password'])
  })

  test('Add item and remove from cart', { tag: ['@cart'] }, async ({ prodInfo, prodCart }) => {
    await prodInfo.clickAnItem(data['product'])
    await prodCart.clickCart()
    await prodCart.removeItemCart()
    await prodCart.emptyCart()
  })

  test('Place an order', { tag: ['@e2e'] }, async ({ prodInfo, prodCart, checkoutPage }) => {
    await prodInfo.clickAnItem(data['product'])
    await prodCart.clickCart()
    await checkoutPage.clickCheckout()
    await checkoutPage.enterAddress(data['address']['firstname'], data['address']['lastname'], data['address']['zipcode'])
    await checkoutPage.checkoutOverview()
    await checkoutPage.finishCheckout()
    await checkoutPage.orderCompletion()
  })

  test('Check github hover link', { tag: '@git' }, async ({ page }) => {
    await page.goto('https://mrjohn5on.github.io/')
    const home = page.locator('.nav_menu_list').getByRole('link', { name: 'Home', exact: true })
    await expect(home).toHaveCSS('color', 'rgb(255, 4, 4)')
    await home.hover({ force: true })
    await expect(home).toHaveCSS('color', 'rgb(0, 0, 0)')
  })

  const students: string[] = ['Vijay', 'Noel', 'Prakash']
  students.forEach(stu => {
    test(`DB validation for ${stu}`, { tag: '@db' }, async ({ mongoclient }) => {
      //rest of your tests
      const json = await mongoclient.readStudent(stu)
      expect(json.first_name).toEqual(stu)
      expect(json.age).toBeGreaterThan(18)
      expect(json.last_name).not.toBeNull()
    })
  })
})
