import {  test as base, expect} from '@playwright/test'
import { HomePage, Checkout, ProductCartPage, ProductInfo} from '@pageobjects/page'
import {  ReadData }from '@utilities/test.data'


type pageObject = {
    homePage : HomePage,
    checkoutPage : Checkout,
    prodInfo : ProductInfo,
    prodCart : ProductCartPage,
    readData : ReadData
}
const test = base.extend< pageObject>({
    readData: new ReadData(),
    homePage : async({page}, use) =>{
        const homePage = new HomePage(page)
        await use(homePage);
    },
    checkoutPage : async({page}, use)=>{
        const checkout = new Checkout(page)
        await use(checkout);
    },

    prodInfo : async({page}, use)=>{
        const prodInfo = new ProductInfo(page)
        await use(prodInfo);
    },
    prodCart : async({page}, use)=>{
        const prodCart = new ProductCartPage(page)
        await use(prodCart);
    }
})

export { test, expect}