


import {obtenerEncuentas} from './script/service.js'
import { contarRespuestasNull, contarRespuestasValidas, contarRespuestasPorTipo} from './script/funciones.js'
import { cargarGraficas } from './grafs.js'

document.addEventListener('DOMContentLoaded', async () => {

    let Encuestas = await obtenerEncuentas()

    let pTotalEncuentas = document.getElementById('totalEncuentas')
    let pTotalContestadas = document.getElementById('totalContestadas')
    let ptotalNoContestadas = document.getElementById('totalNoContestadas')
    
    pTotalEncuentas.textContent = Encuestas.length
    pTotalContestadas.textContent = contarRespuestasValidas(Encuestas)
    ptotalNoContestadas.textContent = contarRespuestasNull(Encuestas)
    
    let total_encuentas = Encuestas.length
    let total_respuestasValidas = contarRespuestasValidas(Encuestas)
    let total_respuestasNull = contarRespuestasNull(Encuestas)
    let respuestas_por_tipo = contarRespuestasPorTipo(Encuestas)
    
    await cargarGraficas(total_respuestasValidas,total_respuestasNull, respuestas_por_tipo)


})