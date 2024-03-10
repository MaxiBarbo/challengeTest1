import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { chromium, firefox, Page} from 'playwright';
import { Elements } from '../pages/objectModel';


let browser;
let page: Page
let elements: Elements
let segundos = 1900
const browserName = 'firefox'
const escenario1 = '@agregar-producto'
const escenario2 = '@eliminar-producto'

Before( { timeout: 10000 }, async () => {
    browser = await firefox.launch({ headless: true });
    page = await browser.newPage();
    elements = new Elements(page)
});

Given('que estoy en la pagina de login en la tienda SauceDemo {string}', async function (URL: string)  {
    await page.goto(URL)
});

When('se ingresa usuario {string} y contraseña {string}', async (user: string ,password: string) => {
    elements.loginUser(user, password)
    await page.waitForTimeout(segundos)
    await page.locator('[data-test="login-button"]').click();
});

// Escenario @leer-sheets de excel y google
Then('se accede a los datos parametrizados en Excel', async () => {
    elements.dataSheets()
});

Then('se accede a los datos parametrizados en google sheets', async () => {
    elements.googleSheet()
});

After( async () => {
    await page.waitForTimeout(segundos)
});