const { Sequelize } = require("sequelize")


const conexion = new Sequelize('Encuesta','encuentas','Temporal$2024',{
    host:'192.165.30.242',
    dialect:'mysql'
})

module.exports = conexion