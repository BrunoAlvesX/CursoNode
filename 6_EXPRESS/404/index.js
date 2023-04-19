const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const usersRoutes = require('./users')

//ler o body
app.use(
    express.urlencoded({
        extended: true,
    })
)

//arquivos estaticos
app.use(express.static('public'))

app.use(express.json())

const basePath = path.join(__dirname, 'templates')

app.use('/users',usersRoutes)

app.get('/', (request, response) => {
    response.sendFile(`${basePath}/index.html`)
})

app.use(function(request,response,next){
    response.status(404).sendFile(`${basePath}/404.html`)
})

app.listen(port,() => {
    console.log(`App rodando na porta ${port}`)
})

