import {expect, test} from '@playwright/test';

import {cardData} from "../data/testData";

import {CatalogPage} from '../page-object/Catalog.page';
import {BasketPage} from '../page-object/Basket.page';
import {CheckoutPage} from '../page-object/Checkout.page';
import {MyAccountPage} from '../page-object/MyAccount.page';

test.describe('E2E: order flow', () => {
    test.beforeAll(async () => {
        console.log('beforeAll: prepare test data');
        console.log('beforeAll: generate users');
        console.log('beforeAll: ready');
    });

    test.beforeEach(async ({page}) => {
        console.log('beforeEach: open catalog page');
        await page.goto('/');
    });

    test.afterEach(async ({page}, testInfo) => {
        if (testInfo.status !== testInfo.expectedStatus) {
            console.log('afterEach: test failed: ${testInfo.title}');

            await page.screenshot({
                path: 'test-result/${testInfo.title}-failed.png',
                fullPage: true,
            })
        }
    })

    test.afterAll(async () => {
        console.log('afterAll: cleanup test data');
    })

    test('Create user, login, order 2 items, payment', async ({ page }) => {
        const catalogPage = new CatalogPage(page);
        const checkoutPage = new CheckoutPage(page);
        const myAccountPage = new MyAccountPage(page);
        const basketPage = new BasketPage(page);

        let items;

        await test.step('Select two items', async () => {
            items = await catalogPage.selectProduct();
        })

        await test.step('Verify basket counter(visible, qty)', async () => {
            await expect(catalogPage.basketCount).toBeVisible();
            await expect(catalogPage.basketCount).toContainText('2', {timeout: 3000});
        })

        await test.step('Go to basket', async () => {
            await catalogPage.goToBasket();
        })

        await test.step('Verify products details in basket', async () => {
            await expect(basketPage.firstProdoctItemName).toHaveText(items.secondProduct.name);
            await expect(basketPage.secondProdoctItemName).toHaveText(items.firstProduct.name);
            await expect(basketPage.firstProdoctItemPrice).toHaveText(items.secondProduct.price);
            await expect(basketPage.secondProdoctItemPrice).toHaveText(items.firstProduct.price);
        })

        await test.step('Verify total price', async () => {
            const firstProductPriceNumber = Number((await basketPage.firstProdoctItemPrice.innerText()).replace(/\D/g,''));
            const secondProductPriceNumber = Number((await basketPage.secondProdoctItemPrice.innerText()).replace(/\D/g,''));
            const totalNumber = parseInt((await basketPage.totalPrice.innerText()).replace(/[^\d.]/g,''),10);
            expect(totalNumber).toBe(firstProductPriceNumber+secondProductPriceNumber);
        })

        await test.step('Go to Checkout Page', async () => {
            await basketPage.goToCheckoutPage();
        })

        await test.step('Fill payment data and submit payment', async () => {
            await checkoutPage.fillPaymentData(cardData.cardNumber,cardData.cardDate,cardData.cardCVV);
        })

        await test.step('Verify successful order', async () => {
            await expect(checkoutPage.successCheckoutText).toBeVisible({timeout:8000});
            await expect(checkoutPage.page).toHaveURL('/checkout');
        })

        await test.step('Go to My Account page', async () => {
            await checkoutPage.goToMyAccount();
            await expect(checkoutPage.page).toHaveURL('/account');
        })

        await test.step('Verify total amount in My account page', async () => {
            const totalPrice = Number(items.firstProduct.price.replace('$','')) + Number(items.secondProduct.price.replace('$',''));
            await expect(myAccountPage.totalAmountValue).toContainText(`${totalPrice}`);
        })

        await test.step('Verify items list', async () => {
            await expect(myAccountPage.items.first()).toBeVisible();
            await expect(myAccountPage.items.last()).toBeVisible();
            await expect(myAccountPage.logoutButton).toBeEnabled();
        })

        await test.step('Logout', async () => {
            await myAccountPage.logout();
        })
    });
})
