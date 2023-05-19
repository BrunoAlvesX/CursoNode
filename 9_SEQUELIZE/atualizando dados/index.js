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

app.get('/users/:id', async (request,response) => {
    const id = request.params.id
    const user = await User.findOne({raw: true, where: { id: id}})
    response.render('userview', { user })
})

app.post('/users/delete/:id', async (request,response) => { 
    const id = request.params.id

    await User.destroy({ where: { id:id }})

    response.redirect('/')
})

app.get('/users/edit/:id', async (request,response) => { 
    const id = request.params.id

    const user = await User.findOne({ raw: true, where: { id: id }})

    response.render('useredit', { user })
})

app.post('/users/update', async (request,response) => { 
    const id = request.body.id
    const name = request.body.name
    const occupation = request.body.occupation
    let newsletter = request.body.newsletter

    if (newsletter === 1) {
        newsletter = true
    }else{
        newsletter = false
    }

    const userData = {
        id,
        name,
        occupation,
        newsletter
    }

    await User.update(userData, { where: {id:id}})
    response.redirect('/')
})

app.get('/', async (request,response) => {

    const users = await User.findAll({raw: true})
    console.log(users)
    response.render('home', { users: users})
})

conn.sync().then(() => {
    app.listen(3000)
}).catch(err => console.log(err))