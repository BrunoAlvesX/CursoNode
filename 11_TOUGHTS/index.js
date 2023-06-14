const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')

const app = express()

const conn = require('./db/conn')

//template engine
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

//receber resposta do body
app.use(
    express.urlencoded({
        extended: true
    })
)

//para receber o dado em json
app.use(express.json)

//session middleware
app.use(
    session({
        name: "session",
        secret: "nosso_secret",
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function() {},
            path: require('path').join(require('os').tmpdir(),'sessions'),
        }),
        cookie: {
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now() + 360000),
            httpOnly: true
        }
    })
)

//flash messages
app.use(flash())

//arquivos publicos
app.use(express.static('public'))

//salvar a sessao da resposta
app.use((request,response,next) =>{ //caso o usuario n esteja logado ele da um next
    if(request.session.userid){ //se o usuario estiver logado manda a sessao que esta na requisicao oara a resposta
        response.locals.session = request.session
    }

    next()
})

conn
    .sync()
    .then(() => {
        app.listen(3000)
    })
    .catch((error) => console.log(err))

