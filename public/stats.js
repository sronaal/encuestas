


import {obtenerEncuentas} from './script/service.js'
import { contarRespuestasNull, contarRespuestasValidas, contarRespuestasPorTipo, contarRespuestasPorPregunta,contarRespuestaPregunta5} from './script/funciones.js'
import { cargarGraficas } from './grafs.js'

document.addEventListener('DOMContentLoaded', async () => {

    let Encuestas = await obtenerEncuentas()
    console.log(Encuestas)
    let pTotalEncuentas = document.getElementById('totalEncuentas')
    let pTotalContestadas = document.getElementById('totalContestadas')
    //let ptotalNoContestadas = document.getElementById('totalNoContestadas')
    
    pTotalEncuentas.textContent = Encuestas.length
    pTotalContestadas.textContent = contarRespuestasValidas(Encuestas)
    //ptotalNoContestadas.textContent = contarRespuestasNull(Encuestas)
    
    let total_encuentas = Encuestas.length
    let total_respuestasValidas = contarRespuestasValidas(Encuestas)
    let total_respuestasNull = contarRespuestasNull(Encuestas)
    let respuestas_por_tipo = contarRespuestasPorTipo(Encuestas)
    let total_RespuestasPorPregunta = contarRespuestasPorPregunta(Encuestas)
    let total_RespuestasPregunta5 = contarRespuestaPregunta5(Encuestas)
    console.log(total_RespuestasPregunta5)
    localStorage.setItem('totalEncuetas', total_encuentas)
    localStorage.setItem('total_respuestasValidas', total_respuestasValidas)
    localStorage.setItem('total_respuestasNull', total_respuestasNull)

    await cargarGraficas(total_respuestasValidas,total_respuestasNull, respuestas_por_tipo,total_RespuestasPorPregunta,total_RespuestasPregunta5)



})