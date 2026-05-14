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
    }

    async selectProduct() {
        await this.coffeeMachineAddToBasketButton.click({delay:500});
        await this.tabletAddToBasketButton.click({delay: 500});
        await this.page.waitForLoadState('networkidle');
        await this.basketCount.waitFor();
        const itemsInfo = await this.getProductInfo();
        return itemsInfo;
    }

    async goToBasket() {
        await this.basketCount.click();
    }

    async getProductInfo(){
        return {
            firstProduct: {
                name: await this.tabletName.innerText(),
                price: await this.tabletPrice.innerText(),
            },

            secondProduct: {
                name: await this.coffeeMachineName.innerText(),
                price: await this.coffeeMachinePrice.innerText(),
            }
        }
    }
}