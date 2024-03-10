Feature: login con credenciales desde fuentes de datos
    como usuario de testing
    quiero realizar login con las credencilas obtenidas desde un archivo excel, google sheet y parametros gherkin
    para verificar la funcionalidad de login con diferentes fuentes de datos

@login-01 @smokeTest   
Scenario: login mediante credenciales obtenidas desde diferentes fuente de datos
    Given que estoy en la pagina de login en la tienda SauceDemo 'https://www.saucedemo.com/' 
    When se ingresa usuario 'standard_user' y contraseña 'secret_sauce'
    Then se accede a los datos parametrizados en Excel
    Then se accede a los datos parametrizados en google sheets