const express = require('express')
const app = express()
const port = 3000

const path = require('path')

//ler o body
app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use(express.json())

const basePath = path.join(__dirname, 'templates')

app.get('/users/add', (request, response) => {
    response.sendFile(`${basePath}/userForm.html`)
})


app.get('/users/:id', (request, response) => {
    const id = request.params.id

    //leitura da tabela users, resgatar um usuario do banco
    console.log(`Estamos buscando pelo usuario de id ${id}`)

    response.sendFile(`${basePath}/users.html`)
})


app.get('/', (request, response) => {
    response.sendFile(`${basePath}/index.html`)
})

app.post('/users/save', (request, response) => {
    console.log(request.body);

    const name = request.body.name
    const age = request.body.age

    console.log(`O nome do usuario e ${name} e ele tem ${age} anos`);

    response.sendFile(`${basePath}/userForm.html`)
})

app.listen(port,() => {
    console.log(`App rodando na porta ${port}`)
})

