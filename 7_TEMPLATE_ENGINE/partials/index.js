const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

const hbs = exphbs.create({
    partialsDir: ['views/partials'],
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')


app.get('/blog', (request,response) => {

    const posts = [
        {
            title: 'Aprender Node.js',
            category: 'Javascript',
            body: 'Este artigo vai te ajudar a aprender node.js',
            comments: 4
        },
        {
            title: 'Aprender php',
            category: 'PHP',
            body: 'teste',
            comments: 4
        },
        {
            title: 'Aprender python',
            category: 'Python',
            body: 'teste',
            comments: 4
        }
    ]
    response.render('blog',{posts})
})


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