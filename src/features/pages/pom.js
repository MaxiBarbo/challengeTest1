const { expect, assert } = require('chai');
require('dotenv').config()
const jwt = require('jsonwebtoken')

class Elements {
    constructor(page){
        this.page = page;
        this.usernameInputSelector = 'input[name="user-name"]';
        this.passwordInputSelector = 'input[name="password"]';
        this.alias = 'input[name="alias"]'
        this.monto = 'input[name="amount"]'
        this.mensaje = page.getByText('Tu transferencia se realizó con éxito')
        this.saldo = page.locator('//*[@id="root"]/main/div[1]/div[2]/div/p');
        this.sortContainer = page.locator('[data-test="product_sort_container"]');
    }

    async enterUsername(username) {
        await this.page.fill(this.usernameInputSelector, username);
    }
    
    async enterPassword(password) {
        await this.page.fill(this.passwordInputSelector, password);
    }

    async loginUser(email,pass){
        await this.page.fill(this.usernameInputSelector, email);
        await this.page.fill(this.passwordInputSelector, pass); 
    }

    async selectSortOption(string1,string2) {
        let option = string1.toLowerCase() + string2.toLowerCase()
        await this.sortContainer.selectOption(option);
    }
    
    async selectPriceOptionLow(string1,string2){
        let option = string1.slice(0,-1) + string2.slice(0,-2)
        await this.sortContainer.selectOption(option)
    }

    async selectPriceOptionHigh(string1, string2){
        let option = string1.slice(0,-2) + string2.slice(0,-1)
        await this.sortContainer.selectOption(option)
    }

    async verifyOrderAZ(){
        const itemsHandle = await this.page.$$('.inventory_item_name');
        const items = await Promise.all(itemsHandle.map(item => this.page.evaluate(el => el.innerText.trim(), item)));
        const sortedItems = [...items].sort();
        expect(JSON.stringify(items)).to.equal(JSON.stringify(sortedItems));

        console.log('Original Items:', items);
        console.log('Sorted Items:', sortedItems);
    }

    async verifyOrderZA(){
        const itemsHandle = await this.page.$$('.inventory_item_name');
        const items = await Promise.all(itemsHandle.map(item => this.page.evaluate(el => el.innerText.replace(/^\s+|\s+$/g, ''), item)));
        const sortedItems = [...items].sort((a, b) => b.localeCompare(a));
        expect(JSON.stringify(items)).to.equal(JSON.stringify(sortedItems));

        console.log('Original Items:', items);
        console.log('Sorted Items:', sortedItems);
    }

    async verifyOrderByPriceLowToHigh() {
        const itemsHandle = await this.page.$$('.inventory_item');
        const items = await Promise.all(itemsHandle.map(async (item) => {
        const name = await this.page.evaluate(el => el.querySelector('.inventory_item_name').innerText.trim(), item);
        const price = await this.page.evaluate(el => parseFloat(el.querySelector('.inventory_item_price').innerText.replace('$', '')), item);
        return { name, price };
    }));
        const sortedItems = [...items].sort((a, b) => a.price - b.price);
        expect(JSON.stringify(items)).to.equal(JSON.stringify(sortedItems));

        console.log('Original Items:', items);
        console.log('Sorted Items:', sortedItems);
    }

    async verifyOrderByPriceHighToLow() {
        const itemsHandle = await this.page.$$('.inventory_item');
        const items = await Promise.all(itemsHandle.map(async (item) => {
        const name = await this.page.evaluate(el => el.querySelector('.inventory_item_name').innerText.trim(), item);
        const price = await this.page.evaluate(el => parseFloat(el.querySelector('.inventory_item_price').innerText.replace('$', '')), item);
        return { name, price };
    }));
        const sortedItems = [...items].sort((a, b) => b.price - a.price);
        expect(JSON.stringify(items)).to.equal(JSON.stringify(sortedItems));
        
        console.log('Original Items:', items);
        console.log('Sorted Items:', sortedItems);
    }
}
module.exports = Elements;