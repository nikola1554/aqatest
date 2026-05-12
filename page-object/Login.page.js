export class LoginPage {
    constructor(page) {
        this.page = page;
        this.emailField = page.locator('[id="login-email"]');
        this.passwordField = page.locator('[id="login-password"]');
        this.loginBtn = page.locator('[id="login-button"]');
        this.registerBtn = page.locator('[id="login-register-button"]');
    }

    async navigate(){
        await this.page.goto('https://aqa-app.vercel.app/login');
    }

    async login(email, password){
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.loginBtn.click();

    }

    async clickRegisterButton(){
        await this.registerBtn.click();
    }
}