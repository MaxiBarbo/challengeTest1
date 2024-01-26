Feature: Verificar checkout con todos los productos de la tienda

    Como usuario de la tienda
    Quiero comprar todos los productos de la tienda exitosamente
    Para verificar el correcto checkout de la tienda

@cart-checkout
Scenario: Comprar todos los productos de la tienda
    Given que he ingresado en la web: 'https://www.saucedemo.com/'
    When ingreso usuario 'standard_user' y contraseña 'secret_sauce' a la tienda 
    When que he agregado todos los productos de la lista al carrito
        | Nombre                            | Precio esperado | 
        | Sauce Labs Backpack               | 29.99           | 
        | Sauce Labs Bike Light             | 9.99            | 
        | Sauce Labs Bolt T-Shirt           | 15.99           |
        | Sauce Labs Fleece Jacket          | 49.99           |
        | Sauce Labs Onesie                 | 7.99            |
    When ingreso al carrito de compras
    When ingreso datos personales para completar el checkout '<firstName>', '<lastName>', '<postalCode>'
    When verifico los productos y el valor total del saldo acumulado en el carrito
    Then confirmo la compra en 'finish'
    Then recibo la confirmacion exitosa 'Thank you for your order!'
Examples:
        | firstName | lastName | postalCode |
        | lilia     | Marin    | 2002       |    
