Feature: Verificar funcionamiento del carrito

    Como usuario de la tienda
    Quiero comprar productos exitosamente
    Para verificar el correcto checkout de la tiena

Background: 
    Given que estoy en la pagina de inicio de sesion de la tienda online

@items-price
Scenario Outline: Agregar un articulo al carrito y verificar su precio
    When agrego el siguiente item '<producto>' al carrito 
    When verifico que el precio '<precio>' sea el indicado por la tienda
    Then el item se agrega al carrito
Examples:
| producto           | precio    | 
| backpack           | $29.99    |
| bike-light         | $9.99     |
| bolt-t-shirt       | $15.99    |
| fleece-jacket      | $49.99    |
| onesie             | $7.99     |

@cart-checkout
Scenario Outline: Agregar varios articulos al carrito y proceder al pago
    When que he agregado todos los productos de la lista al carrito
    When ingreso al carrito de compras
    When ingreso datos personales para completar el checkout '<firstName>', '<lastName>', '<postalCode>'
    When verifico el valor total del saldo en el carrito
    Then confirmo la compra en 'finish'
    Then recibo la confirmacion exitosa 'Thank you for your order!'
Examples:
    | firstName | lastName | postalCode |
    | Lali      | Marin    | 1986       |    
