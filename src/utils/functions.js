const Auth = entries.map(e => e.Auth)
// Contamos canitdad de valores unicos en la categoria 'Auth'
const countTypesAuth = [...new Set(Auth)]
// Contamos cantidad de cada valor encontrado en la categoria 'Auth'
const countAuth = {}
Auth.forEach(Auth => {
countAuth[Auth] = (countAuth[Auth] || 0) + 1
})

//funcion para verificar el rpecio obteniendo los nombres y precios de una lista de elementos
async function verifyPrice(precio, item) {
    const selectorPrecio = await this.page.getByText(item).first().textContent();
    expect(selectorPrecio).contain(precio);

    const preciosObtenidos = await this.page.$$eval('.inventory_item_price', precios =>
        precios.map(precio => parseFloat(precio.innerText.replace('$', '')))
    );

    const nombresObtenidos = await this.page.$$eval('.inventory_item_name', nombres => 
    nombres.map(nombre => nombre.innerText.trim())
    );

    const producto = [
        { nombre: item, valor: precio}
    ]}

    //Funcion  para mapear varios elementos de una clase en precio
        const preciosObtenidos = await this.page.$$eval('.inventory_item_price', precios =>
        precios.map(precio => parseFloat(precio.innerText.replace('$', '')))
    );    
        console.log(`Producto: ${preciosObtenidos}, Precio: ${precio}`)
    