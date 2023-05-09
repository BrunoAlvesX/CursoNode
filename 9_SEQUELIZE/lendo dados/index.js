const express = require('express')
const exphbs = require('express-handlebars')
const  conn = require('./db/conn')

const User = require('./models/User')

const app = express()

app.use(
    express.urlencoded({
        extended: true
    })
)

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/users/create', (request,response) => {
    response.render('adduser')
})

app.post('/users/create', async(request,response) => {
    const name = request.body.name
    const occupation = request.body.occupation
    let newsletter = request.body.newsletter

    if(newsletter === 'on'){
        newsletter = true
    } else {
        newsletter = false
    }

    await User.create({name,occupation,newsletter})

    response.redirect('/')
})

app.get('/', (request,response) => {
    response.render('home')
})

conn.sync().then(() => {
    app.listen(3000)
}).catch(err => console.log(err))