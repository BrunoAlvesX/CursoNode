const http = require("http")
const fs = require("fs")

const port = 3000

const server = http.createServer((request,response) => {
  const urlInfo = require("url").parse(request.url, true)
  const name = urlInfo.query.name

  if(!name){
    fs.readFile('index.html', function(error,data){
      response.writeHead(200, {'Content-Type': 'text/html'})
      response.write(data)
      return response.end()
    })
  }else{

    const nameNewLine = name + "\r\n"

    fs.appendFile("arquivo.txt", nameNewLine, function(error, data){
      response.writeHead(302,{
        location: "/"
      })
      return response.end()
    })
  }

})

server.listen(port,() => {
    console.log(`Servidor rodando na porta ${port}`)
})