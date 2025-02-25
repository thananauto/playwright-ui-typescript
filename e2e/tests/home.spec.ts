import { test } from '@utilities/fixture'

test.describe('Application Basic Tests', () => {
  let data: any
  test.beforeAll(async ({ readData }, testInfo) => {
    const _testName: string = testInfo.title.split('_')[0]
    data = readData.getFile()['credentials']
  })

  test.beforeEach(async ({ homePage }) => {
    await homePage.launchApp(process.env.URL)
    await homePage.login(data['username'], data['password'])
  })

  test(
    'TC01_veirfy Jacket link clicked',
    {
      tag: ['@home'],
    },
    async ({ homePage }) => {
      await homePage.clickJacket()
    },
  )

  test(
    'TC02_Verify all items have cart or remove button',
    {
      tag: ['@home'],
    },
    async ({ prodInfo }) => {
      await prodInfo.validateRemoveOrAddToCart()
    },
  )
})
