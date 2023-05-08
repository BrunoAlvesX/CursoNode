const express = require('express')
const exphbs = require('express-handlebars')
const  conn = require('./db/conn')

const app = express()

app.use(
    express.urlencoded({
        extended: true
    })
)

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (request,response) => {
    response.render('home')
})

app.listen(3000)