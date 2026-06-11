const {AbstractPage} = require('./Abstract.page');
export class MyAccountPage extends AbstractPage {
    constructor(page){
        super(page);
        this.totalAmountValue = page.locator('#account-order-0 p', {hasText: 'Total Amount:'});
        this.items = page.locator('#account-order-0 ul > li');
        this.logoutButton = page.locator('[id="account-logout-button"]');
    }

    async logout(){
        await this.logoutButton.click();
    }
}