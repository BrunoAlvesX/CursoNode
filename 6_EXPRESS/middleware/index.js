const express = require('express')
const app = express()
const port = 3000

const path = require('path')

const basePath = path.join(__dirname, 'templates')

const checkAuth = function name(request, response, next) {
    request.authStatus = true

    if (request.status) {
        console.log('Está logado');
        next()
    } else {
        console.log('Não esta logado,faca o login para continuar');
        next()
    }
}

app.get('/', (request, response) => {
    response.sendFile(`${basePath}/index.html`)
})

app.listen(port,() => {
    console.log(`App rodando na porta ${port}`)
})
