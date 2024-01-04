Feature: Verificar funcionamiento del carrito

    Como usuario de la tienda SauceDemo
    Quiero comprar productos exitosamente
    Para verificar el correcto checkout de la tienda

@items-price
Scenario: Agregar un articulo al carrito y verificar su precio
    Given que he ingresado en 'https://www.saucedemo.com/'
    When inicio sesion usuario 'standard_user' y contraseña 'secret_sauce' a la tienda 
    When agrego el siguiente item '<producto>' al carrito 
    When verifico que el precio '<precio>' sea el indicado por la tienda
    Then el item se agrega al carrito 
    Then y se verifica con exito su nombre pruducto y precio en $
Examples:
| producto           | precio    | 
| backpack           | $29.99    |
| bike-light         | $9.99     |
| bolt-t-shirt       | $15.99    |
| fleece-jacket      | $49.99    |
