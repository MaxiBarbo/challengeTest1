const { Given, When, Then, Before } = require('@cucumber/cucumber');
const { expect, assert } = require('chai');
const { chromium } = require('playwright');
const Elements = require('../../features/pages/pom')
require('dotenv').config()

let browser, page;
let POM;
let segundos = 2000

Before( { timeout: 10000 }, async () => {
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
    POM = new Elements(page)
});

Given('que estoy en la pagina de inicio de sesion de la tienda online', async () => {
    await page.goto(process.env.URL)
    // await page.waitForTimeout(segundos)
    POM.loginUser(process.env.USER,process.env.PASS)
    await page.waitForTimeout(1000)
    await page.locator('[data-test="login-button"]').click();
});

// 1er escenario de prueba

When('agrego el siguiente {string} al carrito', async (producto) => {
    // expect(process.env.URL).to.include('/inventory.html')
    await page.waitForTimeout(segundos)
    POM.addItemCart(producto)

    console.log(producto)
});

When('verifico el {string} indicado por la tienda', async (precio) => {
    await page.waitForTimeout(segundos)
    POM.verifyPrice(precio)
    
});

Then('el item se agrega al carrito', async () => {
    await page.waitForTimeout(segundos)

});

// 2do escenario de prueba

When('que he agregado varios productos al carrito', async () => {
    await page.waitForTimeout(segundos)
    // expect(process.env.URL).to.include('inventory.html')
    await page.waitForTimeout(segundos)
    POM.addMultipleItemsOnCart()
    
});

When('ingreso al carrito de compras', async () => {
    // expect(process.env.URL).to.include('cart.html')
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