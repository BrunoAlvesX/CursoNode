const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

const products = [
    {
        id: "1",
        title: "Livro",
        price: 12.99
    },
    {
        id: "2",
        title: "Cadeira",
        price: 199.99
    },
    {
        id: "3",
        title: "Lampada",
        price: 9.99
    },
]

app.get('/', (request,response) => {
    response.render('home',{ products })
})

app.get('/product/:id', (request,response) => {
    const product = products[parseInt(request.params.id) -1]
    response.render('product',{ product })
})


app.listen(3000)
