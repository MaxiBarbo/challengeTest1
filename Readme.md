---
runme:
  id: 01HJ48GA59R8PQKAYGY229A9V3
  version: v2.0
---

# Proyecto de Pruebas con Cucumber

Este proyecto utiliza Cucumber para escribir y ejecutar pruebas de aceptación en lenguaje natural. Las pruebas están escritas en Gherkin y se ejecutan utilizando el framework de Cucumber.

## Requisitos Previos

tener instalado [Node.js](https://nodejs.org/)

## Configuración del Proyecto

1. Clona este repositorio a tu máquina local:

```bash {"id":"01HJ48GA59R8PQKAYGXTT6STSY"}
git clone https://github.com/MaxiBarbo/challengeTest1.git
```

2. Navega al directorio del proyecto:

```bash {"id":"01HJ48GA59R8PQKAYGXW2EWXWM"}
cd AQA_TestTask/
```

3. Instala las dependencias del proyecto:

```bash {"id":"01HJ48GA59R8PQKAYGY007EZ03"}
npm install
```

## Ejecución de las Pruebas

Para ejecutar las pruebas, utiliza el siguiente comando:

```bash {"id":"01HJ48GA59R8PQKAYGY0GMR826"}
npm run test
```

## Informe de ejecion del Reporter

Para ejecutar el reporter, utiliza el siguiente comando:

```bash {"id":"01HJ49KTH37EZRSEV75Q9KR6B2"}
npm run reporter
```

## Estructura del test

- features: Contiene los archivos .feature que describen los escenarios de prueba en Gherkin.
- helper: contiene un reporter.ts que se ejecuta luego de npm run test
- step_definitions: Contiene las clases de definición de pasos de Cucumber.
- report: Contiene los informes de ejecución después de correr las pruebas.
