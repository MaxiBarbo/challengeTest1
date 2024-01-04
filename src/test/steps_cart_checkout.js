const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { expect, assert } = require('chai');
const { chromium } = require('playwright');
const Elements = require('../features/pages/pom')
require('dotenv').config()

let browser, page;
let POM
let segundos = 1900

Before( { timeout: 10000 }, async () => {
    browser = await chromium.launch({ headless: true });
    page = await browser.newPage();
    POM = new Elements(page)
});

Given('que estoy en la pagina de inicio de sesion de la tienda', async () => {
    await page.goto(process.env.URL)
    POM.loginUser(process.env.USER,process.env.PASS)
    await page.waitForTimeout(1000)
    await page.locator('[data-test="login-button"]').click();
    await page.waitForTimeout(segundos)
});

When('que he agregado todos los productos de la lista al carrito', async () => {
    await page.waitForTimeout(segundos)
    POM.addMultipleItemsOnCart()
    await page.waitForTimeout(segundos)
});

When('ingreso al carrito de compras', async () => {
    await page.waitForTimeout(segundos)
    await page.locator('#shopping_cart_container a').click();
    await page.locator('[data-test="checkout"]').click();
    await page.waitForTimeout(segundos)
});

When('ingreso datos personales para completar el checkout {string}, {string}, {string}', async (firstname, lastname, postalcode) => {
    await page.waitForTimeout(segundos)
    POM.checkoutData(firstname, lastname, postalcode)
    await page.waitForTimeout(segundos)
    await page.locator('[data-test="continue"]').click();
});

When('verifico el valor total del saldo en el carrito', async () => {
    await page.waitForTimeout(segundos)
    POM.verifyPriceItemsCart()
});

Then('confirmo la compra en {string}', async (button) => {
    await page.waitForTimeout(segundos)
    await page.locator(`[data-test=${button}]`).click();
});

Then('recibo la confirmacion exitosa {string}', async (mensaje) => {
    await page.waitForTimeout(segundos)
    await page.getByRole('heading', { name: mensaje })
});

After( async () => {
// Cerrar el navegador después de cada escenario
    if (this.browser) {
    await this.browser.close();
}
});