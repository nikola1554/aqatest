const {test} = require('@playwright/test');
const {newUser1} = require('../data/testData');
const {LoginPage} = require("../page-object/Login.page");
const {RegisterPage} = require("../page-object/Register.page");


test('setup: login and save storageState', async ({page,context}) => {
    const loginPage = new LoginPage(page);
    const registerPage = new RegisterPage(page);

    await test.step('Open login page', async () => {
        await loginPage.openLoginPage();
        await loginPage.clickRegisterButton();
    })

    await test.step('Register new user', async () => {
        await registerPage.fillRegistrationForm(newUser1);
    })

    await test.step('Login with created user', async () => {
        await loginPage.login(newUser1.email, newUser1.password);
    })

    await test.step('Save storage state', async () => {
        await context.storageState({path: 'data/storageState.json'});
    })
})