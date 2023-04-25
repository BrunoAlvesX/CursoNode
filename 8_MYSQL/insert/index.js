const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql2')

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

    const sql = `INSERT INTO books (title,pageqty) VALUES ('${title}','${pageqty}')`

    conn.query(sql, function(err){
        if(err){
            console.log(err);
        }

        response.redirect('/')
    })
})

app.get('/', (request,response) => {
    response.render('home')
})

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'nodemysql'
})

conn.connect(function(err){
    if(err){
        console.log(err);
    }

    console.log('conectou ao mysql');

    app.listen(3000)
})
