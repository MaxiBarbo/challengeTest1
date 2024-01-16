const { Given, When, Then, Before, After} = require('@cucumber/cucumber');
const { expect, assert } = require('chai');
const { chromium, firefox } = require('playwright');
const Elements = require('../pages/pom')
const BASE_URL = require('../../utils/url-verify')

let browser, page;
let base_url
let POM
let dataFeature
let segundos = 1900
const browserName = 'firefox'
const escenario1 = '@agregar-producto'
const escenario2 = '@eliminar-producto'

Before( { timeout: 10000 }, async () => {
    browser = await firefox.launch({ headless: true });
    page = await browser.newPage();
    POM = new Elements(page)
    base_url = new BASE_URL(page) 
});

Given('que he iniciado sesion en la url tienda SauceDemo {string}', async (URL) => {
    await page.goto(URL)
    console.log('URL Web:' + URL)
    // indicamos y verificamos que el tamño de pantalla sea eleligo (width/height)
    base_url.screenMobileSizeIphone12(390,844)
    // base_url.screenDesktopSize(1920,1000)
    console.log(`Tipo de navegador: ${browserName}`)
});

When('ingreso mi usuario {string} y contraseña {string}', async (user,password) => {
    POM.loginUser(user,password)
    await page.waitForTimeout(1000)
    await page.locator('[data-test="login-button"]').click();
    await page.waitForTimeout(segundos)
});


Then('tengo los siguientes productos en la tienda:', async (dataTable) => {
    dataFeature = dataTable

});

// Escenario @agregar-producto

When('selecciono el producto1 {string} y lo agrego al carrito', async (producto1) => {
    console.log('Test Name: ' + escenario1)
    await page.waitForTimeout(segundos)
    POM.addProduct(producto1)
});

When('selecciono el producto2 {string} y lo agrego al carrito', async (producto2) => {
    POM.addProduct(producto2)
});

Then('deberia ver los productos agregados al carrito', async () => {
    await page.waitForTimeout(segundos)
    await page.locator('#shopping_cart_container a').click();
    POM.productsOnCart()
    await page.locator('[data-test="checkout"]').click();
    POM.checkoutData('armando','meunfaso','2025')
    await page.waitForTimeout(segundos)
    await page.locator('[data-test="continue"]').click();
});

Then('el subtotal1 del carrito debe ser ${string}', async (subTotal) => {
    await page.waitForTimeout(segundos)
    POM.verifyCheckout(subTotal)
    await page.waitForTimeout(segundos)
});

// Escenario @eliminar-producto

Given('que tengo los productos {string} y {string} en el carrito de compras', async (producto1, producto2) => {
    console.log('Test Name: ' + escenario2)
    POM.addProduct(producto1)
    POM.addProduct(producto2)
    await page.waitForTimeout(segundos)
    await page.locator('#shopping_cart_container a').click();
    await page.waitForTimeout(segundos)
    POM.verifyProducts(producto1, producto2)
    POM.productsOnCart()
});

When('elimino el producto2 {string} del carrito', async (producto2) => {
    POM.deleteProducto(producto2)
    await page.waitForTimeout(segundos)
    
});

Then('deberia ver que el producto2 {string} ya no esta en el carrito', async (producto2) => {
    POM.verifyProductNotInCart(producto2)
    await page.waitForTimeout(segundos)
    POM.productsOnCart()
    await page.waitForTimeout(segundos)
});

Then('el subtotal2 del carrito debe ser ${string}', async (subTotal) => {
    await page.locator('[data-test="checkout"]').click();
    POM.checkoutData('armando','meunfaso','2025')
    await page.waitForTimeout(segundos)
    await page.locator('[data-test="continue"]').click();
    POM.verifyCheckout(subTotal)
    await page.waitForTimeout(segundos)

});

After( async () => {
// Cerrar el navegador después de cada escenario
    if (this.browser) {
    await this.browser.close();
}
});