import { test } from '@utilities/fixture'

test.describe('Validate the app behaviour in Product information page', () => {
  let data: any
  test.beforeAll(async ({ readData }, testInfo) => {
    const _testName: string = testInfo.title.split('_')[0]
    data = readData.getFile()['credentials']
  })

  test.beforeEach(async ({ homePage }) => {
    await homePage.launchApp(process.env.URL)
    await homePage.login(data['username'], data['password'])
  })

  test('validate all image have valid url', { tag: ['@plp'] }, async ({ prodInfo }) => {
    await prodInfo.validateAllHaveValidImages()
  })

  test('validate all items have price', { tag: ['@plp'] }, async ({ prodInfo }) => {
    await prodInfo.validateAllItemsHavePrice()
  })

  test('validate sorting fucntionality of PIP', { tag: ['@plp'] }, async ({ prodInfo }) => {
    await prodInfo.validateLowToHighPrice()
  })
})
