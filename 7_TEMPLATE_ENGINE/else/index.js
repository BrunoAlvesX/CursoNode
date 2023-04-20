const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/dashboard', (request,response) => {
    response.render('dashboard')
})

app.get('/', (request,response) => {

    const user = {
        name: "Bruno",
        surname: "Alves"
    }

    const auth = false
    const approved = true

    response.render('home', { user: user, auth ,approved})
})

app.listen(3000)