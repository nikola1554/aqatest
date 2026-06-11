const {AbstractPage} = require('./Abstract.page');
export class RegisterPage extends AbstractPage {
    constructor(page) {
        super(page);
        this.firstNameField = page.locator('[id="register-first-name"]');
        this.lastNameField = page.locator('[id="register-last-name"]');
        this.emailAddressField = page.locator('[id="register-email"]');
        this.passwordField = page.locator('[id="register-password"]');
        this.cityField = page.locator('[id="register-city"]');
        this.selectCountryDropDown = page.locator('[id="register-country"]');
        this.phoneField = page.locator('[id="register-phone"]');
        this.streetAndHouseNumberField = page.locator('[id="register-street"]');
        this.zipCodeField = page.locator('[id="register-zip"]');
        this.submitRegistrationBtn = page.locator('[id="register-button"]');
    }

    async fillRegistrationForm(testData){
        await this.firstNameField.waitFor();
        await this.firstNameField.fill(testData.firstName);
        await this.lastNameField.waitFor();
        await this.lastNameField.fill(testData.lastName);
        await this.emailAddressField.waitFor();
        await this.emailAddressField.fill(testData.email);
        await this.passwordField.waitFor();
        await this.passwordField.fill(testData.password);
        await this.cityField.waitFor();
        await this.cityField.fill(testData.city);
        await this.selectCountryDropDown.waitFor();
        await this.selectCountryDropDown.selectOption(testData.country);
        await this.phoneField.waitFor();
        await this.phoneField.fill(testData.phoneNumber);
        await this.streetAndHouseNumberField.waitFor();
        await this.streetAndHouseNumberField.fill(testData.street);
        await this.zipCodeField.waitFor();
        await this.zipCodeField.fill(testData.zipCode);
        await this.submitRegistrationBtn.waitFor();
        await this.submitRegistrationBtn.click();
    }
}