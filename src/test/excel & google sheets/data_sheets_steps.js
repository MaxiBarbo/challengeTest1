const { Given, When, Then, Before, After} = require('@cucumber/cucumber');
const { expect, assert } = require('chai');
const { chromium, firefox } = require('playwright');
const Elements = require('../../features/pages/pom')
const BASE_URL = require('../../utils/url-verify')
const accessGoogleSheet = require('../../features/pages/googleSheetAcces');
const accessExcelSheet = require('../pages/excelAcces');


let browser, page;
let base_url
let POM
let segundos = 1900
const browserName = 'firefox'
const escenario1 = '@agregar-producto'
const escenario2 = '@eliminar-producto'

Before( { timeout: 10000 }, async () => {
    browser = await firefox.launch({ headless: false });
    page = await browser.newPage();
    POM = new Elements(page)
    base_url = new BASE_URL(page) 
});

Given('que he iniciado sesion en la url tienda SauceDemo {string}', async (URL) => {
    await page.goto(URL)
    console.log('URL Web:' + URL)
    // indicamos y verificamos que el tamño de pantalla sea eleligo (width/height)
    // base_url.screenMobileSizeIphone12(390,844)
    base_url.screenDesktopSize(1920,1000)
    console.log(`Tipo de navegador: ${browserName}`)
});

When('ingreso mi usuario {string} y contraseña {string}', async (user,password) => {
    POM.loginUser(user,password)
    await page.waitForTimeout(1000)
    await page.locator('[data-test="login-button"]').click();
    await page.waitForTimeout(segundos)
});

// Escenario @leer-sheets de excel y google
When('accedo a los datos parametrizados en Excel', async () => {
let excelData = 'src/templates/dataLogin.xlsx'
// accessExcelSheet(excelData)
await page.waitForTimeout(segundos)

});

When('accedo a los datos parametrizados en google sheets', async () => {
const spreadsheetId = '1-Ge_utFt7pmLCH6jQiVcPtutyufL6ym18Rn6FHfFios';
const apiKey = 'AIzaSyBeuLvEvy5QXAiJnq-7YGa1TWTqYsBdJlU';
const range = 'Datos Parametrizados en Login!A1:J38';
let fila = 7
let columna = 2

accessGoogleSheet(spreadsheetId, apiKey, range, fila, columna);

await page.waitForTimeout(segundos)

});

After( async () => {
// Cerrar el navegador después de cada escenario
    if (this.browser) {
    await this.browser.close();
    }
});