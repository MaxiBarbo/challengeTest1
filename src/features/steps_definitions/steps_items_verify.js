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
let productList
const browserName = 'fIrefox'
const testName = 'Comprar 1 producto de la tienda'

Before( { timeout: 10000 }, async () => {
    browser = await firefox.launch({ headless: true });
    page = await browser.newPage();
    POM = new Elements(page)
    base_url = new BASE_URL(page) 
});

Given('que he ingresado en {string}', async (URL) => {
    await page.goto(URL)
    console.log(`URL Web: ${URL}`)
    console.log('Test Name: ' + testName)
    // indicamos y verificamos que el tamño de pantalla sea eleligo (width/height)
    base_url.screenDesktopSize(1920,1000)
    console.log(`Tipo de navegador: ${browserName}`)
});

When('inicio sesion usuario {string} y contraseña {string} a la tienda', async (user,password) => {
    POM.loginUser(user,password)
    await page.waitForTimeout(1000)
    await page.locator('[data-test="login-button"]').click();
    await page.waitForTimeout(segundos)
});

When('agrego el siguiente item {string} al carrito', async (producto) => {
    item = producto
    // console.log(`Test para verificar nombre y precio del producto ${item}`)
    productList = POM.nameListProducts()
    await page.waitForTimeout(segundos)
    POM.addItemCart(item)
    await page.waitForTimeout(segundos)
    await page.locator('#shopping_cart_container a').click();
});

When('verifico que el precio ${string} sea el indicado por la tienda', async (precio) => {
    await page.waitForTimeout(segundos)
    POM.verifyPriceOnCart(item,precio,productList)
    
});

Then('el item se agrega al carrito', async () => {
    await page.waitForTimeout(segundos)
    POM.verifyProduct(item)
    await page.waitForTimeout(segundos)
});

When('ingreso al {string} los datos firstName {string}, lastName {string}, postalCode {string}', async (checkout,firstName,lastName,postalCode) => {
    await page.locator(`[data-test=${checkout}]`).click();
    POM.checkoutData(firstName, lastName, postalCode)
    await page.waitForTimeout(segundos)
});

When('completo la compra {string}', async (finish) => {
    await page.locator('[data-test="continue"]').click(); 
    POM.verifyPriceItemsCart()
    await page.waitForTimeout(segundos)
    await page.locator(`[data-test=${finish}]`).click();
});

When('recibo mensaje {string}', async (message) => {
    POM.verifyOrderMessage(message)
    await page.waitForTimeout(segundos)
});

After( async () => {
    // Cerrar el navegador después de cada escenario
        if (this.browser) {
        await this.browser.close();
    }
});