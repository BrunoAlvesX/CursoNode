const express = require('express')
const exphbs = require('express-handlebars')
const  pool = require('./db/conn')

const app = express()

app.use(
    express.urlencoded({
        extended: true
    })
)

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.post('/books/insertbook', (request,response) => {
    const title = request.body.title
    const pageqty = request.body.pageqty

    const sql = `INSERT INTO books (??,??) VALUES (?,?)`
    const data = ['title','pageqty', title, pageqty]

    pool.query(sql, data, function(err){
        if(err){
            console.log(err)
            return
        }

        response.redirect('/books')
    })
})

app.get('/books', (request,response) => {
    const sql = "SELECT * FROM books"

    pool.query(sql, function(err,data){
        if(err){
            console.log(err)
            return
        }

        const books = data

        response.render('books', { books })
    })
})

app.get('/books/:id', (request,response) => {

    const id = request.params.id

    const sql = `SELECT * FROM books WHERE ?? = ?`

    const data = ['id',id]

    pool.query(sql,data, function(err,data){
        if(err){
            console.log(err)
            return
        }

        const book = data[0]

        response.render('book', { book })
    })
})


app.get('/books/edit/:id', (request,response) => {

    const id = request.params.id
    const sql = `SELECT * FROM books WHERE ?? = ?`

    const data = ['id',id]

    pool.query(sql,data, function(err,data){
        if(err){
            console.log(err)
            return
        }

        const book = data[0]

        response.render('editbook', { book })
    })
})

app.post('/books/updatebook', (request,response) => {
    const id = request.body.id
    const title = request.body.title
    const pageqty = request.body.pageqty

    const sql = `UPDATE books SET ?? = ?, ?? = ? WHERE ?? = ?`
    const data = ['title', title, 'pageqty', pageqty, 'id', id]

    pool.query(sql,data, function(err){
        if(err){
            console.log(err)
            return
        }

        response.redirect('/books')
    })
})

app.post('/books/remove/:id',(request,response) => {
    const id = request.params.id
    const sql = `DELETE FROM books WHERE ?? = ?`
    const data = ['id', id]

    pool.query(sql,data, function(err){
        if(err){
            console.log(err)
            return
        }
        response.redirect('/books')
    })
})

app.get('/', (request,response) => {
    response.render('home')
})

app.listen(3000)