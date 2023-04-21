const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')


app.get('/post', (request,response) => {

    const post = {
        title: "Aprender node.js",
        category: "Javascript",
        body: 'Este artigo vai te ajudar a aprender node.js',
        comments: 4
    }

    response.render('blogpost',{ post })
})

app.get('/dashboard', (request,response) => {

    const items = ["Item a","Item b","Item c"]

    response.render('dashboard',{items})
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