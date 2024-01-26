const { Given, When, Then, Before, After} = require('@cucumber/cucumber');
const { expect, assert } = require('chai');
const { chromium, firefox } = require('playwright');
const Elements = require('../../features/pages/pom')
const BASE_URL = require('../../utils/url-verify')

let browser, page;
let base_url
let POM
let segundos = 1900
const browserName = 'firefox'
const testName = 'Eliminar un producto del carrito'
let producto

Before( { timeout: 10000 }, async () => {
    browser = await firefox.launch({ headless: false });
    page = await browser.newPage();
    POM = new Elements(page)
    base_url = new BASE_URL(page) 
});

Given('ingreso en la url tienda {string}', async (URL) => {
    await page.goto(URL)
    console.log('URL Web:' + URL)
    console.log('Test Name: ' + testName)
    // indicamos y verificamos que el tamño de pantalla sea eleligo (width/height)
    base_url.screenMobileSizeIphone12(390,844)
    // base_url.screenDesktopSize(1920,1000)
    console.log(`Tipo de navegador: ${browserName}`)
});

When('ingreso usuario {string} y contraseña {string}', async (name,pass) => {
    POM.loginUser(name,pass)
    await page.waitForTimeout(1000)
    await page.locator('[data-test="login-button"]').click();
    await page.waitForTimeout(segundos)
});

Given('verifico que el carrito de compras este vacio', async () => {
    POM.verifyStatusCart()

});

When('agrego un producto de la lista al carrito {string}', async (item) => {
    producto = item
    await page.waitForTimeout(segundos)
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()
    console.log(`Se agregar el producto ${producto} al carrito`)

});

When('ingreso al carrito de compras', async () => {
    await page.locator('#shopping_cart_container a').click();
    await page.waitForTimeout(segundos)
    await POM.countItemsCart(producto)
});

When('elimino el producto recientemente agregado', async () => {
    await page.waitForTimeout(segundos)
    await page.locator('[data-test="remove-sauce-labs-bolt-t-shirt"]').click();
    // console.log(`Se elimina el producto ${producto} del carrito`)
});

Then('el carrito de compras debe quedar vacio', async () => {
    await POM.countItemsCart(producto)
    await page.waitForTimeout(segundos)
    
});

After( async () => {
// Cerrar el navegador después de cada escenario
    if (this.browser) {
    await this.browser.close();
}
});