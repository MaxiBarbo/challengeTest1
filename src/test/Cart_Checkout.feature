Feature: Verificar funcionamiento del carrito

    Como usuario de la tienda
    Quiero comprar productos exitosamente
    Para verificar el correcto checkout de la tiena

@cart-checkout
Scenario Outline: Agregar todos articulos al carrito y proceder al pago
    Given que estoy en la pagina de inicio de sesion de la tienda 
    When que he agregado todos los productos de la lista al carrito
    When ingreso al carrito de compras
    When ingreso datos personales para completar el checkout '<firstName>', '<lastName>', '<postalCode>'
    When verifico el valor total del saldo acumulado en el carrito
    Then confirmo la compra en 'finish'
    Then recibo la confirmacion exitosa 'Thank you for your order!'
Examples:
    | firstName | lastName | postalCode |
    | lilia     | Marin    | 2002       |    
