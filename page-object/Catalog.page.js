import {expect} from "@playwright/test";

export class CatalogPage {
    constructor(page){
        this.page = page;
        this.catalogTitle = page.locator('[id="catalog-title"]');
        this.coffeeMachineAddToBasketButton = page.locator('[id="product-add-6"]');
        this.tabletAddToBasketButton = page.locator('[id="product-add-5"]');
        this.basketCount = page.locator('[id="cart-count"]');
        this.tabletName = page.locator('[id="product-name-5"]');
        this.coffeeMachineName = page.locator('[id="product-name-6"]');
        this.tabletPrice = page.locator('[id="product-price-5"]');
        this.coffeeMachinePrice = page.locator('[id="product-price-6"]');

        this.tabletNameValue = '';
        this.coffeeMachineNameValue = '';
        this.tabletPriceValue = '';
        this.coffeeMachinePriceValue = '';
    }

    async checkTitle() {
        await this.catalogTitle.waitFor();
    }

    async selectProduct() {
        await this.coffeeMachineAddToBasketButton.click({delay:500});
        await this.tabletAddToBasketButton.click({delay: 500});
        await this.page.waitForLoadState('networkidle');
        await this.basketCount.waitFor();
        await expect(this.basketCount).toContainText('2', {timeout: 3000});
        await this.getProductInfo();
        await this.basketCount.click();
        // await this.page.pause();

    }

    async getProductInfo(){
        this.tabletNameValue = await this.tabletName.innerText();
        this.coffeeMachineNameValue = await this.coffeeMachineName.innerText();
        this.tabletPriceValue = await this.tabletPrice.innerText();
        this.coffeeMachinePriceValue = await this.coffeeMachinePrice.innerText();
    }

}