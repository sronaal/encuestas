const { Sequelize } = require("sequelize")


const conexion = new Sequelize('Encuesta','root','admusr520',{
    host:'localhost',
    dialect:'mysql'
})

module.exports = conexion