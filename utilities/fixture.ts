import { test as base, expect } from '@playwright/test'
import { dbSingleton, type MongoClientSingelton } from '@utilities/mongoclient'
import { HomePage, Checkout, ProductCartPage, ProductInfo } from '@pageobjects/page'
import { ReadData } from '@utilities/test.data'

type pageObject = {
  homePage: HomePage
  checkoutPage: Checkout
  prodInfo: ProductInfo
  prodCart: ProductCartPage
  readData: ReadData
  mongoclient: Readonly<MongoClientSingelton>
}
type pageObject1 = {
  homePage: HomePage
}

const test2 = base.extend<pageObject1>({
  homePage: async ({ baseURL, page, context }, use) => {
    await context.newPage()
    const homePage = new HomePage(page)
    await page.goto(baseURL as string)
    await use(homePage)
  },
})
const test = base.extend<pageObject>({
  readData: new ReadData(),
  homePage: async ({ baseURL, page }, use) => {
    const homePage = new HomePage(page)
    await page.goto(baseURL as string)
    await use(homePage)
  },
  checkoutPage: async ({ page }, use) => {
    const checkout = new Checkout(page)
    await use(checkout)
  },

  prodInfo: async ({ page }, use) => {
    const prodInfo = new ProductInfo(page)
    await use(prodInfo)
  },
  prodCart: async ({ page }, use) => {
    const prodCart = new ProductCartPage(page)
    await use(prodCart)
  },

  mongoclient: async ({ page }, use) => {
    const _page = page
    const client = await dbSingleton.getClient()
    if (!client) throw Error('DB Client Instance is not initiated')
    await use(dbSingleton)
  },
})

export { test, test2, expect }
