Feature: Validar Nombres de Productos en una Tienda
    Como usuario de la tienda
    Quiero validar lo nombres de los productos listados
    Para verificar que se encuentren presentes

Background:
    Given que he ingresado en la url tienda SauceDemo 'https://www.saucedemo.com/' 
    When ingreso con mi usuario 'standard_user' y contraseña 'secret_sauce'

Scenario: Verificar que los nombres de productos en la tienda coincidan con una lista esperada
    Given que tengo una lista de nombres de productos
        | Productos                         | 
        | Sauce Labs Backpack               | 
        | Sauce Labs Bike Light             | 
        | Sauce Labs Bolt T-Shirt           | 
        | Sauce Labs Fleece Jacket          | 
        | Sauce Labs Onesie                 | 
        | Test.allTheThings() T-Shirt (Red) | 
    When obtengo los nombres de productos en la tienda
    Then los nombres de productos en la tienda deberían coincidir con la lista de nombres de productos
