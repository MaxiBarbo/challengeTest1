Feature: Verificar funcionamiento del carrito

    Como usuario de la tienda
    Quiero comprar productos exitosamente
    Para verificar el correcto checkout de la tiena

@items-price
Scenario: Agregar un articulo al carrito y verificar su precio
    Given que he ingresado con mi usuario y contraseña a la tienda
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
