const fs = require("fs")

const arqAntigo = "arquivo.txt"
const arqNovo = "novoarquivo.txt"

fs.rename(arqAntigo, arqNovo, function(error) {
    if (error) {
        console.log(error)
        return
    }
    console.log("arquivo renomeado");
})