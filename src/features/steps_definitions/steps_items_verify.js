const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { expect, assert } = require('chai');
const { chromium, firefox, webkit } = require('playwright');
const Elements = require('../pages/pom')
const BASE_URL = require('../../utils/url-verify')

let browser, page;
let POM
let base_url
let segundos = 1900
let item

Before( { timeout: 10000 }, async () => {
    browser = await firefox.launch({ headless: true });
    page = await browser.newPage();
    POM = new Elements(page)
    base_url = new BASE_URL(page) 
    const browserName = 'fIrefox'
    // indicamos y verificamos que el tamño de pantalla sea eleligo (width/height)
    // base_url.screenMobileSizeIphone12(390,844)
    base_url.screenDesktopSize(1900,1000)

    console.log(`Tipo de navegador: ${browserName}`)
});

Given('que he ingresado en {string}', async (URL) => {
    await page.goto(URL)
    console.log(`URL Web: ${URL}`)
    console.log(`Test para verificar nombre y precio del producto ${item}`)
});

When('inicio sesion usuario {string} y contraseña {string} a la tienda', async (user,password) => {
    POM.loginUser(user,password)
    await page.waitForTimeout(1000)
    await page.locator('[data-test="login-button"]').click();
    await page.waitForTimeout(segundos)
});

When('agrego el siguiente item {string} al carrito', async (producto) => {
    item = producto
    await page.waitForTimeout(segundos)
    POM.addItemCart(item)
    await page.waitForTimeout(segundos)
    await page.locator('#shopping_cart_container a').click();
});

When('verifico que el precio {string} sea el indicado por la tienda', async (precio) => {
    await page.waitForTimeout(segundos)
    POM.verifyPriceOnCart(item,precio)
    
});

Then('el item se agrega al carrito', async () => {
    await page.waitForTimeout(segundos)

});

Then('y se verifica con exito su nombre pruducto y precio en $', async () => {
    
});

After( async () => {
    // Cerrar el navegador después de cada escenario
        if (this.browser) {
        await this.browser.close();
    }
    });