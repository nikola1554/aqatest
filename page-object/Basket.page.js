import {expect} from "@playwright/test";

export class BasketPage{
    constructor(page, tabletNameValue, coffeeMachineNameValue,tabletPriceValue,coffeeMachinePriceValue) {
        this.page = page;
        this.firstProdoctItemName = page.locator('[id="cart-item-name-6"]');
        this.secondProdoctItemName = page.locator('[id="cart-item-name-5"]');
        this.firstProdoctItemPrice = page.locator('[id="cart-item-price-6"]');
        this.secondProdoctItemPrice = page.locator('[id="cart-item-price-5"]');
        this.totalPrice = page.locator('[id="cart-total"]');
        this.checkoutButton = page.locator('[id="cart-checkout-button"]');
        this.removeFirstItemButton = page.locator('[id="cart-item-decrease-6"]');
        this.addFirstItemButton = page.locator('[id="cart-item-increase-6"]');

        this.tabletNameValue = tabletNameValue;
        this.coffeeMachineNameValue = coffeeMachineNameValue;
        this.tabletPriceValue = tabletPriceValue;
        this.coffeeMachinePriceValue = coffeeMachinePriceValue;
    }

    async compareProductsDetails(){
        await expect(this.firstProdoctItemName).toHaveText(this.coffeeMachineNameValue);
        await expect(this.secondProdoctItemName).toHaveText(this.tabletNameValue);
        await expect(this.firstProdoctItemPrice).toHaveText(this.coffeeMachinePriceValue);
        await expect(this.secondProdoctItemPrice).toHaveText(this.tabletPriceValue);
    }

    async checkTotalPrice(){
        const firstProductPriceNumber = Number((await this.firstProdoctItemPrice.innerText()).replace(/\D/g,''));
        const secondProductPriceNumber = Number((await this.secondProdoctItemPrice.innerText()).replace(/\D/g,''));
        const totalNumber = parseInt((await this.totalPrice.innerText()).replace(/[^\d.]/g,''),10);
        expect(totalNumber).toBe(firstProductPriceNumber+secondProductPriceNumber);
        await this.checkoutButton.click();
        await this.page.waitForURL('https://aqa-app.vercel.app/checkout');
    }
}