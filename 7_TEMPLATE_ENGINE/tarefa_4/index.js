const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (request,response) => {

    const items = ["Caneta","Lapiseira","Borracha"]

    response.render('home',{items})
})


app.listen(3000)
