const { Given, When, Then, Before } = require('@cucumber/cucumber');
const { expect, assert } = require('chai');
const { chromium } = require('playwright');
const Elements = require('../pages/pom')

let browser, page;
let POM;
let segundos = 1900

Before( { timeout: 10000 }, async () => {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  POM = new Elements(page)
});

let URL = 'https://www.saucedemo.com/'

Given('the user is on the SauceDemo website', async () => {
  await page.goto(URL)
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