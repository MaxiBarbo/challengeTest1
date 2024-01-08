Feature: Verificar checkout con 1 producto de la tienda

    Como usuario de la tienda SauceDemo
    Quiero comprar 1 producto exitosamente
    Para verificar el correcto checkout de la tienda

@item-checkout
Scenario: Comprar 1 producto de la tienda
    Given que he ingresado en 'https://www.saucedemo.com/'
    When inicio sesion usuario 'standard_user' y contraseña 'secret_sauce' a la tienda 
    When agrego el siguiente item '<producto>' al carrito 
    When verifico que el precio $'<precio>' sea el indicado por la tienda
    Then el item se agrega al carrito 
    Then ingreso al 'checkout' los datos firstName '<firstName>', lastName '<lastName>', postalCode '<postalCode>'
    Then completo la compra 'finish'
    Then recibo mensaje 'Thank you for your order!'
Examples:
| producto           | precio    | firstName | lastName | postalCode |
| backpack           | $29.99    | max       | power    | 1986       |    
| bike-light         | $9.99     | clari     | sun      | 0001       |
| bolt-t-shirt       | $15.99    | lali      | sari     | 9999       |
| fleece-jacket      | $49.99    | juli      | love     | 0101       |
