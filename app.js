const express = require("express")
const conexion = require("./conexion.js")
const cors = require("cors")
const app = express()
const app2 = express()


<<<<<<< HEAD
=======


>>>>>>> 2452e26 (Cambios)
app.use(cors({ origin: ['https://localhost:8081', 'https://200.91.192.58', 'https://200.91.192.58:8081', 'http://localhost:8081']
}));


app2.use(cors({ origin: ['https://localhost:8081', 'https://200.91.192.58', 'https://200.91.192.58:8081', 'http://localhost:8081']
}));

<<<<<<< HEAD
const rutas = require('./routes/ruta')
app2.use(rutas)

app.use(express.static(__dirname + '/public/'))
app.use(express.static(__dirname + '/public/script'))
=======

const rutas = require('./routes/ruta')
app.use(rutas)

app.use(express.static(__dirname + '/public/'))
app.use(express.static(__dirname + '/public/script/*'))
>>>>>>> 2452e26 (Cambios)







module.exports = {
    app,
    app2
<<<<<<< HEAD
}
=======
}
>>>>>>> 2452e26 (Cambios)
