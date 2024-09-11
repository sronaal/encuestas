const { request, response } = require("express")
const encuestaDao = require('../services/encuentas.service')

let encuentaService = new encuestaDao()

exports.obtenerEncuentas = async (req = request, res = response) => {

    try {
        let encuentas = await encuentaService.findAll()

        return res.status(200).json(encuentas[0])
        
    } catch (error) {

        return res.status(500).json({ error })
    }
}