Feature: Check items added on cart

Background: 
    Given que estoy en la pagina de inicio de sesion de la tienda online

@items-price
Scenario Outline: Scenario Outline name: add items on cart
    When agrego el siguiente '<producto>' al carrito 
    When verifico el '<precio>' indicado por la tienda
    Then el item se agrega al carrito
Examples:
| producto           | precio    | 
| backpack           | $29.99    |
| bike-light         | $9.99     |
| bolt-t-shirt       | $15.99    |
| fleece-jacket      | $49.99    |
| onesie             | $7.99     |

@cart-checkout
Scenario Outline: add multiple items to the cart and proceed to checkout
    When que he agregado varios productos al carrito
    When ingreso al carrito de compras
    When ingreso datos personales para completar el checkout '<firstName>', '<lastName>', '<postalCode>'
    When verifico el valor total del saldo en el carrito
    Then confirmo la compra en 'finish'
    Then recibo la confirmacion exitosa 'Thank you for your order!'
Examples:
    | firstName | lastName | postalCode |
    | Lali      | Marin    | 1986       |    
