Feature: Uso del Carrito de Compras
    Como cliente de la tienda SauceDemo
    Quiero agregar y eliminar productos de mi Carrito
    Para poder revisar y realizar Compras
    
Background: 
    Given que he iniciado sesion en la url tienda SauceDemo 'https://www.saucedemo.com/' 
    When ingreso mi usuario 'standard_user' y contraseña 'secret_sauce'
    Then tengo los siguientes productos en la tienda:
        | Producto                          | Precio          | 
        | Sauce Labs Backpack               | 29.99           | 
        | Sauce Labs Bike Light             | 9.99            | 
        | Sauce Labs Bolt T-Shirt           | 15.99           |
        | Sauce Labs Fleece Jacket          | 49.99           |
        | Sauce Labs Onesie                 | 7.99            |
        | Test.allTheThings() T-Shirt (Red) | 15.99           |

@agregar-producto
Scenario: Agregar productos al carrito de compras
    When selecciono el producto1 'Backpack' y lo agrego al carrito
    When selecciono el producto2 'Fleece Jacket' y lo agrego al carrito
    Then deberia ver los productos agregados al carrito
    Then el subtotal1 del carrito debe ser $'79.98'

@eliminar-producto
Scenario: Eliminar producto del carrito de compras
    Given que tengo los productos 'Bike Light' y 'Onesie' en el carrito de compras
    When elimino el producto2 'Onesie' del carrito
    Then deberia ver que el producto2 'Onesie' ya no esta en el carrito
    Then el subtotal2 del carrito debe ser $'9.99'
