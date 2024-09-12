const { Sequelize } = require("sequelize")


const conexion = new Sequelize('Encuesta','encuentas','',{
    host:'localhost',
    dialect:'mysql'
})

module.exports = conexion