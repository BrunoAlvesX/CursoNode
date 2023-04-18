const express = require('express')
const app = express()
const port = 3000

const path = require('path')

const basePath = path.join(__dirname, 'templates')

app.get('/users/:id', (request, response) => {
    const id = request.params.id

    //leitura da tabela users, resgatar um usuario do banco
    console.log(`Estamos buscando pelo usuario de id ${id}`)

    response.sendFile(`${basePath}/users.html`)
})


app.get('/', (request, response) => {
    response.sendFile(`${basePath}/index.html`)
})

app.listen(port,() => {
    console.log(`App rodando na porta ${port}`)
})
