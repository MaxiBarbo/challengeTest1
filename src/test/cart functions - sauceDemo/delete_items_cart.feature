Feature: Funcionalidades del carrito
    Como practica de testing
    Quiero un caso de prueba relacionado con el funcionamiento del carrito
    Para eliminar un pruducto del mismo

Background:
    Given ingreso en la url tienda 'https://www.saucedemo.com/'
    When ingreso usuario 'standard_user' y contraseña 'secret_sauce'

Scenario: Eliminar un producto del carrito
    Given verifico que el carrito de compras este vacio
    When agrego un producto de la lista al carrito 'Sauce Labs Bolt T-Shirt'
    When ingreso al carrito de compras
    When elimino el producto recientemente agregado
    Then el carrito de compras debe quedar vacio

