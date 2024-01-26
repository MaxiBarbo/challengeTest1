const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { expect, assert } = require('chai');
const { chromium, firefox } = require('playwright');
const Elements = require('../../features/pages/pom')
const BASE_URL = require('../../utils/url-verify')

let browser, page;
let base_url
let POM
let segundos = 1900
let dataFeature
const browserName = 'fIrefox'
const testName = 'Comprar todos los productos de la tienda'

Before( { timeout: 10000 }, async () => {
    browser = await firefox.launch({ headless: true });
    page = await browser.newPage();
    POM = new Elements(page)
    base_url = new BASE_URL(page) 
});

Given('que he ingresado en la web: {string}', async (URL) => {
    await page.goto(URL)
    console.log('URL Web:' + URL)
    console.log('Test Name: ' + testName)
    // indicamos y verificamos que el tamño de pantalla sea eleligo (width/height)
    // base_url.screenMobileSizeIphone12(390,844)
    base_url.screenDesktopSize(1920,1000)
    console.log(`Tipo de navegador: ${browserName}`)
});

When('ingreso usuario {string} y contraseña {string} a la tienda', async (name,pass) => {
    POM.loginUser(name,pass)
    await page.waitForTimeout(1000)
    await page.locator('[data-test="login-button"]').click();
    await page.waitForTimeout(segundos)
});

When('que he agregado todos los productos de la lista al carrito', async (dataTable) => {
    dataFeature = dataTable
    await page.waitForTimeout(segundos)
    POM.addMultipleItemsOnCart()
    await page.waitForTimeout(segundos)
});

When('ingreso al carrito de compras', async () => {
    await page.locator('#shopping_cart_container a').click();
    await page.waitForTimeout(segundos)
    POM.nameItemsCart()
    await page.waitForTimeout(segundos)
    await page.locator('[data-test="checkout"]').click();
});

When('ingreso datos personales para completar el checkout {string}, {string}, {string}', async (firstname, lastname, postalcode) => {
    await page.waitForTimeout(segundos)
    POM.checkoutData(firstname, lastname, postalcode)
    await page.waitForTimeout(segundos)
    await page.locator('[data-test="continue"]').click();
});

When('verifico los productos y el valor total del saldo acumulado en el carrito', async () => {
    POM.veryfiItemsOnCart(dataFeature)
    await page.waitForTimeout(segundos)
    POM.verifyPriceItemsCart()
});

Then('confirmo la compra en {string}', async (button) => {
    await page.waitForTimeout(segundos)
    await page.locator(`[data-test=${button}]`).click();
});

Then('recibo la confirmacion exitosa {string}', async (mensaje) => {
    await page.waitForTimeout(segundos)
    POM.verifyOrderMessage(mensaje)
    await page.waitForTimeout(segundos)
    // await page.getByRole('heading', { name: mensaje })
});

After( async () => {
// Cerrar el navegador después de cada escenario
    if (this.browser) {
    await this.browser.close();
}
});