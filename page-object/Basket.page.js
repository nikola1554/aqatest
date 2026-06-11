const {AbstractPage} = require('./Abstract.page');
export class BasketPage extends AbstractPage {
    constructor(page, tabletNameValue, coffeeMachineNameValue,tabletPriceValue,coffeeMachinePriceValue) {
        super(page);
        this.firstProdoctItemName = page.locator('[id="cart-item-name-6"]');
        this.secondProdoctItemName = page.locator('[id="cart-item-name-5"]');
        this.firstProdoctItemPrice = page.locator('[id="cart-item-price-6"]');
        this.secondProdoctItemPrice = page.locator('[id="cart-item-price-5"]');
        this.totalPrice = page.locator('[id="cart-total"]');
        this.checkoutButton = page.locator('[id="cart-checkout-button"]');
        this.removeFirstItemButton = page.locator('[id="cart-item-decrease-6"]');
        this.addFirstItemButton = page.locator('[id="cart-item-increase-6"]');
    }

    async goToCheckoutPage(){
        await this.checkoutButton.click();
        await this.page.waitForURL('/checkout');
    }
}