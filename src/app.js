const express = require("express")
const conexion = require("./conexion")

const app = express()


const rutas = require('./routes/ruta')
app.use(rutas)

app.use( express.static(__dirname + '/public/') )
app.use( express.static(__dirname + '/public/script') )




module.exports = app