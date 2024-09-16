const express = require("express")
const conexion = require("./conexion.js")
const cors = require("cors")
const app = express()
const app2 = express()


app.use(cors({ origin: ['https://localhost:8081', 'https://200.91.192.58', 'https://200.91.192.58:8081', 'http://localhost:8081']
}));


app2.use(cors({ origin: ['https://localhost:8081', 'https://200.91.192.58', 'https://200.91.192.58:8081', 'http://localhost:8081']
}));

const rutas = require('./routes/ruta')
app2.use(rutas)

app.use(express.static(__dirname + '/public/'))
app.use(express.static(__dirname + '/public/script'))







module.exports = {
    app,
    app2
}
