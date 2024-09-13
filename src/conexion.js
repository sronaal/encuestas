const { Sequelize } = require("sequelize")


const conexion = new Sequelize('Encuesta','root','',{
    host:'localhost',
    dialect:'mysql'
})

module.exports = conexion