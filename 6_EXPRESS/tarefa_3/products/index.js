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
    response.sendFile(`${basePath}/products.html`)
})

router.post('/save', (request, response) => {
    console.log(request.body);

    const name = request.body.name
    console.log(`O nome do produto e ${name}`)

    response.sendFile(`${basePath}/products.html`)
})

module.exports = router
