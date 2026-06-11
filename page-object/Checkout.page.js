const {AbstractPage} = require('./Abstract.page');
export class CheckoutPage extends AbstractPage {
    constructor(page){
        super(page);
        this.cardNumberField = page.getByPlaceholder('Card Number (16 digits)');
        this.payNowBtn = page.getByRole('button', { name: 'Pay Now' });
        this.cardDateField = page.getByPlaceholder( 'MM/YY' );
        this.cardCVVField = page.getByPlaceholder( 'CVV (3 digits)' );
        this.successCheckoutText = page.locator('[id="checkout-success"]')
        this.myAccountButton = page.getByRole('link', { name: 'My Account' });
    }

    async fillPaymentData(cardNumber, cardDate, cardCVV) {
        await this.cardNumberField.type(cardNumber,{delay:100});
        await this.cardNumberField.press('Enter');
        await this.cardDateField.fill(cardDate);
        await this.cardCVVField.fill(cardCVV);
        await this.payNowBtn.click();
    }

    async goToMyAccount(){
        await this.myAccountButton.click();
    }
}