const http = require("http")

const port = 3000

const server = http.createServer((request,response) => {
    response.statusCode = 200
    response.setHeader('Content-type', 'text/html')
    response.end('<h1>Olá, este é meu primeiro server com html</h1><p>Testando atualização</p>')
})

server.listen(port,() => {
    console.log(`Servidor rodando na porta ${port}`)
})