
document.addEventListener('DOMContentLoaded', function () {
async function apiFetch() {
let apiTask = 'https://api.publicapis.org/entries'
const etiquetaH3 = document.getElementById('agrupacion')
const etiquetaH4 = document.getElementById('apikey')
let datos;
let entries;
let start = Date.now()
    try {
        const response = await fetch(apiTask, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error('Error al obtener datos');
        }
        
        const data = await response.json();
        datos = data
        entries = data.entries

    } catch (error) {
        console.error('Error al obtener datos:', error);
    }
    let end = Date.now()
    let duration = end - start
    console.log('El timpo de request es: ' + duration)  

    const Auth = entries.map(e => e.Auth)

    // Contamos canitdad de valores unicos en la categoria 'Auth'
    const countTypesAuth = [...new Set(Auth)]
    
    // Contamos cantidad de cada valor encontrado en la categoria 'Auth'
    const countAuth = {}
    Auth.forEach(Auth => {
        countAuth[Auth] = (countAuth[Auth] || 0) + 1
    });
    // Funcion para imprimir los valores agrupados en pantalla
    for(const key in countAuth){
        if(countAuth.hasOwnProperty(key)){
            const value = countAuth[key];
            const paragraph = document.createElement('p');
            paragraph.textContent = `${key}: ${value}`;
            etiquetaH3.appendChild(paragraph)
        }
    }
    //Funcion para verificar categoria
    const searchElement = 'apiKey'
    const verifyElement = Auth.includes(searchElement)
    const resultadoSearch = document.createElement('p')
    resultadoSearch.textContent = `¿La categoría "${searchElement}" está presente? ${verifyElement ? 'Sí' : 'No'}`
    etiquetaH3.appendChild(resultadoSearch)


    // console.log('Auth unica en grupo: ', countTypesAuth)
    console.log(countTypesAuth)  
    return datos
    }

apiFetch()

})
