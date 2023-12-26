const Auth = entries.map(e => e.Auth)
// Contamos canitdad de valores unicos en la categoria 'Auth'
const countTypesAuth = [...new Set(Auth)]
// Contamos cantidad de cada valor encontrado en la categoria 'Auth'
const countAuth = {}
Auth.forEach(Auth => {
countAuth[Auth] = (countAuth[Auth] || 0) + 1
})