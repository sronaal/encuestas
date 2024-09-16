const router = require("express").Router()
const controller_encuenta = require('../../controllers/encuentas.controller')

router.get('/encuestas',controller_encuenta.obtenerEncuentas)


module.exports = router