const { expect, assert } = require('chai');
require('dotenv').config()
const jwt = require('jsonwebtoken');
// const accessGoogleSheet = require('../pages/googleSheetAcces');

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
        this.iconCart = page.locator('.shopping_cart_link')
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
        const spreadsheetId = '1N2_if3nb_-VFPVxs3g3n5j9L1Agtw886CivwWUpO9DM';
        const apiKey = 'AIzaSyBeuLvEvy5QXAiJnq-7YGa1TWTqYsBdJlU';
        const range = 'login!A1:J38';

        // let emailSheet = await accessGoogleSheet(spreadsheetId, apiKey, range, 1, 0);
        // let passSheet = await accessGoogleSheet(spreadsheetId, apiKey, range, 1, 1);
        // console.log(emailSheet)
        // console.log(passSheet)

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

        console.log('Sorted Items by order A => Z:', sortedItems);
    }

    async verifyOrderZA(){
        const itemsHandle = await this.page.$$('.inventory_item_name');
        const items = await Promise.all(itemsHandle.map(item => this.page.evaluate(el => el.innerText.replace(/^\s+|\s+$/g, ''), item)));
        const sortedItems = [...items].sort((a, b) => b.localeCompare(a));
        expect(JSON.stringify(items)).to.equal(JSON.stringify(sortedItems));

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
        
        console.log('Sorted Items by price High = Low:', sortedItems);
    }

    async addItemCart(producto){
        await this.page.locator(`[data-test="add-to-cart-sauce-labs-${producto}"]`).click()
    }

    async agregarProducto(producto){
        let productoMinuscula = producto.toLowerCase().replace(/\s/g, '')
        await this.page.locator(`[data-test="add-to-cart-sauce-labs-${producto}"]`).click()   
        console.log(`Se agrega el producto: ${productoMinuscula} al carrito`)
    }

    async verifyCheckout(subTotal){
        let itemsCarrito = await this.nameItemsCart()
        const preciosCarrito = itemsCarrito.map(dato => dato.precio)
        const sumaPrecios = preciosCarrito.reduce((total, precio) => total + parseFloat(precio), 0); 
        
        const subTotalObtenido = await this.value_subtotal.textContent()
        const subTotalValue = subTotalObtenido.match(/\d+\.\d+/)

        const tax = await this.value_tax.textContent()
        const taxValue = tax.match(/\d+\.\d+/)  
        
        let totalValueAmount = await this.totalValue.textContent() 
        let totalAmount = totalValueAmount.match(/\d+\.\d+/)    

        let totalPrecio = parseFloat(taxValue[0]) + parseFloat(sumaPrecios)
        let totalReducido = totalPrecio.toFixed(2)

        // Validacion del subTotal extraido de la feature vs subTotal extraido de la suma de productos en el carrito
        expect(parseFloat(subTotal)).to.equal(parseFloat(sumaPrecios))
        // Validacion del subTotal extraido de la feature vs subTotal extraido de la etiqueta "item Total" en "Price Total"
        expect(parseFloat(subTotal)).to.equal(parseFloat(subTotalValue[0]))
        // Validacion de total extraido en la suma del tax y la suma de productos en el carrito vs el total obtenido en la etiqueta de la tienda "Total"
        expect(totalAmount[0]).to.equal(totalReducido)

        console.log(`Monto en carrito: sub-total $${sumaPrecios} + Tax: $${taxValue[0]} = $${totalAmount[0]}`)
    }

    async verifyProducts(producto1,producto2){
        let itemsCarrito = await this.nameItemsCart()
        const nombresEnCarrito = itemsCarrito.map(dato => dato.nombre.toLowerCase().replace(/[\s-]/g, ''))

        let producto1Buscado = producto1.toLowerCase().replace(/[\s-]/g, '')
        let producto2Buscado = producto2.toLowerCase().replace(/[\s-]/g, '')

        const encontrado1 = nombresEnCarrito.some(cadena => cadena.includes(producto1Buscado))
        const encontrado2 = nombresEnCarrito.some(cadena => cadena.includes(producto2Buscado))

        expect(encontrado1, `El producto ${producto1Buscado} no está presente en el carrito.`).to.be.true;
        expect(encontrado2, `El producto ${producto2Buscado} no está presente en el carrito.`).to.be.true;
    }

    async verifyProductNotInCart(producto2){
        const productoVisible = await this.page.isVisible(`text=${producto2}`);
        expect(productoVisible, `El producto ${producto2} está presente en el carrito.`).to.be.false;
    }

    async productsOnCart(){
        let itemsCarrito = await this.nameItemsCart()
        console.log(itemsCarrito)
    }

    async addProduct(name){
        const nameProduct = name.toLowerCase()
        switch(nameProduct){
            case 'bike light':
                await this.page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
                console.log(`El producto: ${nameProduct} se agrega al carrito`);
            break;
            
            case 'backpack':
                await this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
                console.log(`El producto: ${nameProduct} se agrega al carrito`);
            break;
            
            case 'onesie':
                await this.page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
                console.log(`El producto: ${nameProduct} se agrega al carrito`);
            break;  

            case 'fleece jacket':
                await this.page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
                console.log(`El producto: ${nameProduct} se agrega al carrito`);
            break;  

            case 'bolt t-shirt':
                await this.page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
                console.log(`El producto: ${nameProduct} se agrega al carrito`);
            break;  

            case 't-shirt red':
                await page.locator('[data-test="add-to-cart-test\\.allthethings\\(\\)-t-shirt-\\(red\\)"]').click();
                console.log(`El producto: ${nameProduct} se agrega al carrito`);
            break; 

            default:
                console.log('Producto no reconocido');
                break;
        }
    }

    async deleteProducto(name){
        const nameProduct = name.toLowerCase()
        switch(nameProduct){
            case 'bike light':
                await this.page.locator('[data-test="remove-sauce-labs-bike-light"]').click();
                console.log(`El producto ${nameProduct} fue eliminado del carrito`);
            break;
            
            case 'backpack':
                await this.page.locator('[data-test="remove-sauce-labs-backpack"]').click();
                console.log(`El producto ${nameProduct} fue eliminado del carrito`);
            break;
            
            case 'onesie':
                await this.page.locator('[data-test="remove-sauce-labs-onesie"]').click();
                console.log(`El producto ${nameProduct} fue eliminado del carrito`);
            break;  

            case 'fleece jacket':
                await this.page.locator('[data-test="remove-sauce-labs-fleece-jacket"]').click();
                console.log(`El producto ${nameProduct} fue eliminado del carrito`);
            break;  

            case 'bolt t-shirt':
                await this.page.locator('[data-test="remove-sauce-labs-bolt-t-shirt"]').click();
                console.log(`El producto ${nameProduct} fue eliminado del carrito`);
            break;  

            case 't-shirt red':
                await this.page.locator('[data-test="remove-test\\.allthethings\\(\\)-t-shirt-\\(red\\)"]').click();
                console.log(`El producto ${nameProduct} fue eliminado del carrito`);
            break; 

            default:
                console.log('Producto no reconocido');
                break;
        }
    }

    async addMultipleItemsOnCart(){
        const productos = [
            'add-to-cart-sauce-labs-backpack',
            'add-to-cart-sauce-labs-bike-light',
            'add-to-cart-sauce-labs-bolt-t-shirt',
            'add-to-cart-sauce-labs-fleece-jacket',
            'add-to-cart-sauce-labs-onesie',
        ];
        for (const producto of productos) {
            const selector = `[data-test="${producto}"]`;
            await this.page.locator(selector).click();
        }
        return productos
    }

    async nameListProducts(){
        const nameProductsList = await this.page.$$eval('.inventory_list .inventory_item', elementsList => {
            return elementsList.map(elemento => {
                const nombre = elemento.querySelector('.inventory_item_name').innerText.trim();
                const precio = parseFloat(elemento.querySelector('.inventory_item_price').innerText.replace('$', ''));
                return { nombre, precio };
            });
        });
        return nameProductsList;
    }

    async nameItemsCart() {
        // Utiliza this.page.$$eval en lugar de pasar elementosCarrito directamente
        const carritoInfo = await this.page.$$eval('.cart_item', elementosCarrito => {
            return elementosCarrito.map(elemento => {
                const nombre = elemento.querySelector('.inventory_item_name').innerText.trim();
                const precio = parseFloat(elemento.querySelector('.inventory_item_price').innerText.replace('$', ''));
                return { nombre, precio };
            });
        });
        // Imprime carritoInfo después de haber sido declarada
        // console.log(carritoInfo);
        return carritoInfo;
    }

    async verifyPriceOnCart(item,precio,list){
        let productList = list
        //Se realizar un map en la clase cart item contenedora del nombre y precio obtenidos del carrito
        const carritoInfo = await this.page.$$eval('.cart_item', elementosCarrito =>
        elementosCarrito.map(elemento => {
            // se buscar
            const nombre = elemento.querySelector('.inventory_item_name').innerText.trim();
            const precio = parseFloat(elemento.querySelector('.inventory_item_price').innerText.replace('$', ''));
            //retornamos nombre y precio en Array a const carrito info
            return {nombre, precio}; 
            })
        ); 
        // los valores en parametros se pasan a Array
        const productoBuscado = { nombre: item, precio: precio}
        const productoCarrito = carritoInfo[0]  

        let precioConvertido = parseFloat(productoBuscado.precio.replace('$', '')); 
        const productoNombreFeature = productoBuscado.nombre.toLowerCase()
        const productoNombreCarrito = carritoInfo[0].nombre
        // Crear un nuevo objeto normalizado
        const productoBuscadoConvertido = {
            nombre: productoNombreFeature,
            precio: precioConvertido
        };
        // Crear un nuevo objeto normalizado
        const productoCarritoConvertido = {
            nombre: productoNombreCarrito,
            precio: productoCarrito.precio
        };
        expect(productoCarritoConvertido).to.contain(productList)
    }    

    async veryfiItemsOnCart(dataFeature) {
        //Datos de nombre y precio obtenidos de la feature para luego utilizarlos en la validacion a productos en el carrito de compras
        const dataTable = dataFeature.raw();
        const [headers, ...data] = dataTable;
        const datosValidacion = data.map(row => ({
            nombre: row[0],
            precioEsperado: parseFloat(row[1])
        }));
        // Datos obtenidos desde la tienda web
        const dataProducts = await this.nameItemsCart();
        dataProducts.forEach(producto => {
            const datoValidacion = datosValidacion.find(dato => dato.nombre === producto.nombre);
            if (datoValidacion) {
                if (this.aproximadamenteIgual(producto.precio, datoValidacion.precioEsperado)) {
                    console.log(`El producto: ${producto.nombre} tiene el precio correcto de $${producto.precio}.`);
                    
                } else {
                    expect(producto.precio).to.be.closeTo(datoValidacion.precioEsperado, 0.01)
                    console.log(`El producto: ${producto.nombre} tiene un precio incorrecto de $${datoValidacion.precioEsperado}.`);
                }
            } else {
                console.log(`No se encontró información de validación para ${producto.nombre}.`);
            }
        });
        //Funcion para validar los nombres de los productos en la tienda vs datos en feature
        const nombresEsperados = datosValidacion.map(dato => dato.nombre)
        const nombresObtenidos = dataProducts.map(producto => producto.nombre)
        expect(nombresObtenidos).to.deep.equal(nombresEsperados)

        const preciosEsperados = datosValidacion.map(dato => dato.precioEsperado)
        const preciosObtenidos = dataProducts.map(producto => producto.precio)
        expect(preciosObtenidos).to.deep.equal(preciosEsperados)
    }
    
    aproximadamenteIgual(num1, num2, tolerancia = 0.001) {
        return Math.abs(num1 - num2) <= tolerancia;
    }
    
    async verifyPriceItemsCart(){
        const dataProducts = await this.nameItemsCart();   
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
        // const sumaPreciosEsperados = dataProducts.reduce((total, producto) => total + producto.precio, 0);
        let sumaPreciosEsperados = 0;
        for (const producto of dataProducts) {
            sumaPreciosEsperados += producto.precio;
        }
        // Funcion para validar el total de precios con datos obtenidos en la feature y carrito de la tienda
        expect(parseFloat(subTotalValue[0])).to.equal(parseFloat(sumaPreciosEsperados))
        // expect(sumaPreciosEsperados+taxValue[0]).to.equal(totalAmount[0])
        console.log(`Monto en carrito: sub-total: $${subTotalValue[0]} + tax: $${taxValue[0]} = Total: $${totalAmount[0]}`);
    }

    async verifyOrderMessage(msj){
        const mensajeEsperado = msj;
        // Obtener el texto de toda la página
        const contenidoPagina = await this.page.textContent('body');
        // Verificar si el mensaje esperado está presente en el contenido de la página
        expect(contenidoPagina).contain(mensajeEsperado);
        console.log(`Status Message: ${msj}`)
    }

    async verifyProduct(item){
        const dataProducts = await this.nameItemsCart();
        // console.log(dataProducts)
        console.log(`El producto ${dataProducts[0].nombre} se agrego al carrito`);
    }

    async verifyStatusCart(){
        const numElementosInicial = await this.page.$$('.shopping_cart_badge');
        // Compara los números inicial y después de agregar el producto
        assert.strictEqual(numElementosInicial.length, 0, 'El carrito no está vacío después de eliminar productos')
        if (numElementosInicial.length === 0) {
        console.log('El carrito de compras esta vacio al iniciar');
        } else {
        throw new Error(`El carrito de compra tiene productos`);
        }
    }

    async countItemsIconCart(){
        const cartBadgeText = await this.page.$eval('.shopping_cart_badge', (span) => span.innerText);
    }

    async countItemsCart(producto){
        const cartItemsCount = await this.page.$$eval('.cart_item', (items) => items.length);
        if (cartItemsCount > 0) {
            console.log(`El carrito tiene ${cartItemsCount} producto`)
        } else {
            console.log(`El producto ${producto} fue eliminado del carrito`)
        }
    }

    async haveText(dataFeature){
        //Datos de nombre obtenidos de la feature para luego utilizarlos en la validacion de textos
        const dataTable = dataFeature.raw();
        const [headers, ...data] = dataTable;
        const datosValidacion = data.map(row => ({
            nombre: row[0],
        }));
        // Datos de nombre extraido de la classe '.inventory_item_name' del dom
        const elementos = await this.page.$$('.inventory_item_name');
        const textos = await Promise.all(elementos.map(async (elemento) => {
            return await elemento.innerText();
        }));
        
        try {
        datosValidacion.forEach(elemento => {
            expect(textos).to.include(elemento.nombre)
        })    
        } catch (error) {
            throw new Error(error.message + 'Texto del producto no encontrado');
        }
        // console.log(datosValidacion)
        // console.log(textos)
    }
}
module.exports = Elements;