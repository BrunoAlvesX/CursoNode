const express = require('express')
const router = express.Router()

const path = require('path')

//ler o body
router.use(
    express.urlencoded({
        extended: true,
    })
)

router.use(express.json())

const basePath = path.join(__dirname, '../templates')

router.get('/add', (request, response) => {
    response.sendFile(`${basePath}/userForm.html`)
})

router.get('/:id', (request, response) => {
    const id = request.params.id

    //leitura da tabela users, resgatar um usuario do banco
    console.log(`Estamos buscando pelo usuario de id ${id}`)

    response.sendFile(`${basePath}/users.html`)
})

router.post('/save', (request, response) => {
    console.log(request.body);

    const name = request.body.name
    const age = request.body.age

    console.log(`O nome do usuario e ${name} e ele tem ${age} anos`);

    response.sendFile(`${basePath}/userForm.html`)
})

module.exports = router

