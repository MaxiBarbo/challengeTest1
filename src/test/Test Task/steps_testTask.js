const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { expect, assert } = require('chai');
const { chromium } = require('playwright');
const Elements = require('../../features/pages/pom')
const Functions = require('../features/pages/api_response')
require('dotenv').config()

let browser, page;
let POM;
let functions
let segundos = 2000
let API_URL
let propCategory

Before( { timeout: 10000 }, async () => {
  browser = await chromium.launch({ headless: true });
  page = await browser.newPage();
  POM = new Elements(page)
  functions = new Functions(page)
});

//1er escenario de pruebas
Given('the user is on the SauceDemo website', async () => {
  await page.goto(process.env.URL)
});

When('the user logs in with valid credentials user {string} and {string}', async (name,password) => {
  await page.waitForTimeout(segundos)
  POM.loginUser(name,password)
  await page.waitForTimeout(segundos)
  await page.locator('[data-test="login-button"]').click();
});

When('the user sorts the items by Name {string} -> {string}', async (string1, string2) => {
  POM.selectSortOption(string1,string2)
  await page.waitForTimeout(segundos)
});

Then('the items should be sorted by Name \\(A -> Z)', async () => {
  POM.verifyOrderAZ()
  await page.waitForTimeout(segundos)
});

When('the user changes the sorting to Name {string} -> {string}', async (string1,string2) => {
  POM.selectSortOption(string1,string2)
  await page.waitForTimeout(segundos)
});

Then('the items should be sorted by Name \\(Z -> A)', async () => {
  POM.verifyOrderZA()
  await page.waitForTimeout(segundos);
});

When('the user changes the sorting to price {string} -> {string}', async (string1,string2) => {
  POM.selectPriceOptionLow(string1,string2)
  await page.waitForTimeout(segundos)
});

Then('the order should be sorted by price \\(low -> high)', async () => {
  POM.verifyOrderByPriceLowToHigh()
  await page.waitForTimeout(segundos);
});

When('the user changes the items to price {string} -> {string}', async (string1,string2) => {
  POM.selectPriceOptionHigh(string1,string2)
  await page.waitForTimeout(segundos)
});

Then('the order items be sorted by price \\(high -> low)', async () => {
  POM.verifyOrderByPriceHighToLow()
  await page.waitForTimeout(segundos);
});

// 2do escenario de pruebas

Given('make a get request to the api: {string}', async (URL) => {
  API_URL = URL
  // await page.waitForTimeout(segundos);
});


When('read the response and find all objects with property {string}', async (category) => {
  propCategory = category
  await page.waitForTimeout(segundos);
});

When('compare, count and verify the number of object where the property Authentication & Authorization', async () => {
  await functions.apiFetch(API_URL,propCategory)
  await page.waitForTimeout(segundos);
});

Then('print found object to control', async () => {
  let dataApi = await functions.apiDataAuth(API_URL,propCategory)
  await page.waitForTimeout(3000);
});

After( async () => {
  // Cerrar el navegador después de cada escenario
      if (this.browser) {
      await this.browser.close();
  }
  });