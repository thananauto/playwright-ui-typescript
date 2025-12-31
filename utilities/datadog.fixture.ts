import { test as base, type Page } from '@playwright/test'

import { HomePage, Checkout, ProductCartPage, ProductInfo } from '@pageobjects/page'
import { ReadData } from '@utilities/test.data'
import { datadogRUM } from '@utilities/datadog.rum'

type pageObject = {
  homePage: HomePage
  checkoutPage: Checkout
  prodInfo: ProductInfo
  prodCart: ProductCartPage
  readData: ReadData
}

// Add Datadog RUM injection to page context
const pageWithDatadog = base.extend<{ page: Page }>({
  page: async ({ page }, use) => {
    // Intercept HTML responses and inject Datadog RUM script
    if (datadogRUM.isEnabled()) {
      await page.route('**/*', async route => {
        const request = route.request()

        // Only intercept main document requests
        if (request.resourceType() === 'document') {
          const response = await route.fetch()
          const contentType = response.headers()['content-type'] || ''

          // Only inject into HTML responses
          if (contentType.includes('text/html')) {
            const body = await response.text()
            const modifiedBody = datadogRUM.injectIntoHTML(body)

            await route.fulfill({
              response,
              body: modifiedBody,
            })
            return
          }
        }

        // Continue with all other requests
        await route.continue()
      })
    }

    await use(page)
  },
})

// continue with adding the page object classes
const test = pageWithDatadog.extend<pageObject>({
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
})

export { pageWithDatadog, test }

//import this fixture as usual and
