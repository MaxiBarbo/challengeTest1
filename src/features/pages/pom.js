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
        this.value_subtotal = page.locator('.summary_subtotal_label')
        this.value_tax = page.locator('.summary_tax_label')
        this.totalValue = page.locator('.summary_total_label')
        this.firstName = 'input[name="firstName"]'
        this.lastName = 'input[name="lastName"]'
        this.postalCode = 'input[name="postalCode"]'
    }

    async enterUsername(username) {
        await this.page.fill(this.usernameInputSelector, username);
    }
    
    async enterPassword(password) {
        await this.page.fill(this.passwordInputSelector, password);
    }

    async checkoutData(firstname, lastname, postalcode){
        await this.page.fill(this.firstName, firstname)
        await this.page.fill(this.lastName, lastname)
        await this.page.fill(this.postalCode, postalcode)
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

        console.log('Original order Items:', items);
        console.log('Sorted Items by order A => Z:', sortedItems);
    }

    async verifyOrderZA(){
        const itemsHandle = await this.page.$$('.inventory_item_name');
        const items = await Promise.all(itemsHandle.map(item => this.page.evaluate(el => el.innerText.replace(/^\s+|\s+$/g, ''), item)));
        const sortedItems = [...items].sort((a, b) => b.localeCompare(a));
        expect(JSON.stringify(items)).to.equal(JSON.stringify(sortedItems));

        console.log('Original order Items:', items);
        console.log('Sorted Items by order Z => A:', sortedItems);
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

        console.log('Original order Items:', items);
        console.log('Sorted Items by price Low => High:', sortedItems);
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
        
        console.log('Original order Items:', items);
        console.log('Sorted Items by price High = Low:', sortedItems);
    }

    async addItemCart(producto){
        await this.page.locator(`[data-test="add-to-cart-sauce-labs-${producto}"]`).click()
    }

    async verifyPrice(precio){
        const selectorPrecio = await this.page.getByText(precio).first().textContent();
        expect(selectorPrecio).contain(precio); 

        console.log(selectorPrecio)
    }

    async addMultipleItemsOnCart(){
        const productos = [
            'add-to-cart-sauce-labs-backpack',
            'add-to-cart-sauce-labs-bike-light',
            'add-to-cart-sauce-labs-bolt-t-shirt',
            'add-to-cart-sauce-labs-fleece-jacket',
            'add-to-cart-sauce-labs-onesie',
            'add-to-cart-test.allthethings()-t-shirt-(red)'
        ];
        for (const producto of productos) {
            const selector = `[data-test="${producto}"]`;
            await this.page.locator(selector).click();
        }
    }

    async verifyPriceItemsCart(){
    // Obtener los precios de los elementos en el carrito
    const preciosEnCarrito = await this.page.$$eval('.inventory_item_price', precios =>
        precios.map(precio => parseFloat(precio.innerText.replace('$', '')))
    );
    // Sumar los precios
    const total = preciosEnCarrito.reduce((suma, precio) => suma + precio, 0);

    const subTotal = await this.value_subtotal.textContent()
    const tax = await this.value_tax.textContent()
    let totalValueAmount = await this.totalValue.textContent()

    let totalAmount = totalValueAmount.match(/\d+\.\d+/)    
    const subTotalValue = subTotal.match(/\d+\.\d+/)
    const taxValue = tax.match(/\d+\.\d+/)    

    expect(parseFloat(totalAmount[0])).to.equal(parseFloat(taxValue[0]) + parseFloat(total))

    console.log(preciosEnCarrito)
    console.log(`Total en carrito: sub total: ${total} + tax: ${taxValue[0]} = Total: ${totalAmount[0]}`);
    }
}
module.exports = Elements;