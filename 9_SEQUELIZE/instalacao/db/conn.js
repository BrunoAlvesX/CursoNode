const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('nodesequelize','root','root',{
    host: 'localhost',
    dialect: 'mysql'
})

try {
    sequelize.authenticate()
    console.log('conectado com sucesso')
} catch (error) {
    console.log('Não foi possivel conectar', error)
}

module.exports = sequelize

