const express = require('express')
const app = express()
const port = 5000
const path = require('path')
const productRoutes = require('./products')

//ler o body
app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use(express.json())

const basePath = path.join(__dirname, 'templates')

app.use('/products',productRoutes)

app.get('/', (request, response) => {
    response.sendFile(`${basePath}/index.html`)
})

app.listen(port,() => {
    console.log(`App rodando na porta ${port}`)
})