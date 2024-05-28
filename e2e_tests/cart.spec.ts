 import { test, expect } from '@utilities/fixture'

 test.describe('Cart item page validation', () => {
    
    let data : any
    test.beforeEach(async ({ readData, homePage }) => {
        data = readData.getFile()
        await homePage.launchApp( process.env.URL)
        await homePage.login(data['credentials']['username'], data['credentials']['password'])
    })

    test('Add item and remove from cart',  { tag:['@cart'] }, async ({ prodInfo, prodCart }) => {

        await prodInfo.clickAnItem(data['product'])
        await prodCart.clickCart()
        await prodCart.removeItemCart()
        await prodCart.emptyCart()
        
    })

    test('Place an order',   { tag:['@e2e'] },async ({ prodInfo, prodCart, checkoutPage }) => {
        await prodInfo.clickAnItem(data['product'])
        await prodCart.clickCart()
        await checkoutPage.clickCheckout()
        await checkoutPage.enterAddress(data['address']['firstname'], data['address']['lastname'], data['address']['zipcode'])
        await checkoutPage.checkoutOverview()
        await checkoutPage.finishCheckout()
        await checkoutPage.orderCompletion()

    })
    
    

 })
 