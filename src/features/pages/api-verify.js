const { expect, assert } = require('chai');
require('dotenv').config()

class Functions {
    constructor(){

    }
    async apiFetch(URL,category) {
        let apiTask = URL
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
            //Calculamos tiempo el respueta al servidior (diferencia entre inicio y fin)
            let end = Date.now()
            let duration = end - start 
            function mapProp(entries,prop){
                return entries.map(e => e[prop])
            }
            const categoryProp = mapProp(entries, category)
            // Contamos canitdad de valores unicos en la categoria 'Auth'
            const countTypesAuth = [...new Set(categoryProp)]
            // Contamos cantidad de cada valor encontrado en la categoria 'Auth'
            const countAuth = {}
            categoryProp.forEach(prop => {
                countAuth[prop] = (countAuth[prop] || 0) + 1
            })
            entries.forEach(e => { expect(e).to.have.property(category)})

            console.log(`Category tipes: ${category}: ${countTypesAuth}`);       
        }

        async apiDataAuth(URL,category){
            let apiTask = URL
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
                //Calculamos tiempo el respueta al servidior (diferencia entre inicio y fin)
                let end = Date.now()
                let duration = end - start
                //Funcion para mapear un parametro especifico dentro de todos los objetos
                function mapProp(entries,prop){
                    return entries.map(e => e[prop])
                }
                const categoryProp = mapProp(entries, category)
                // Contamos canitdad de valores unicos en la categoria 'Auth'
                const countTypesAuth = [...new Set(categoryProp)]
                // Contamos cantidad de cada valor encontrado en la categoria 'Auth'
                const countAuth = {}
                categoryProp.forEach(prop => {
                    countAuth[prop] = (countAuth[prop] || 0) + 1
                })
                //Funcion para contar todos los Auth
                let totalAuthCount = Object.values(countAuth).reduce((acc, curr) => acc + curr, 0)
                //Funcion para convertir obketo en array
                const array = Object.entries(countAuth).map(([Property, Count ]) => ({ Property, Count }));

                console.log(array)
                console.log(`Total ${category} Counts: ${totalAuthCount}`);
                console.log('Response time: ' + duration) 
            return duration   
        }
}
module.exports = Functions;
