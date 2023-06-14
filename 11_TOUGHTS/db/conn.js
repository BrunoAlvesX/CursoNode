const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('toughts', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
})

try {
    sequelize.authenticate()
    console.log('conectado com sucesso')
} catch (error) {
    console.log(`Nao foi possivel conectar: ${error}`)
}

module.exports = sequelize