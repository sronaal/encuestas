import { obtenerEncuentas } from './script/service.js';
import { contarRespuestasNull, contarRespuestasValidas, contarRespuestasPorTipo, contarRespuestasPorPregunta, contarRespuestaPregunta5 } from './script/funciones.js';
import { cargarGraficas } from './grafs.js';

document.addEventListener('DOMContentLoaded', async () => {
    let Encuestas = await obtenerEncuentas();

    let pTotalEncuentas = document.getElementById('totalEncuentas');
    let pTotalContestadas = document.getElementById('totalContestadas');
    let filterDate = document.getElementById('filterDate');
    let filterDateInicio = document.getElementById('filterDateInicio');
    let filterDateFin = document.getElementById('filterDateFin');


    // Mostrar totales iniciales
    pTotalEncuentas.textContent = Encuestas.length;
    pTotalContestadas.textContent = contarRespuestasValidas(Encuestas);

    // Cálculos iniciales
    let total_respuestasValidas = contarRespuestasValidas(Encuestas);
    let total_respuestasNull = contarRespuestasNull(Encuestas);
    let respuestas_por_tipo = contarRespuestasPorTipo(Encuestas);
    let total_RespuestasPorPregunta = contarRespuestasPorPregunta(Encuestas);
    let total_RespuestasPregunta5 = contarRespuestaPregunta5(Encuestas);

    // Almacenar en localStorage
    localStorage.setItem('totalEncuetas', Encuestas.length);
    localStorage.setItem('total_respuestasValidas', total_respuestasValidas);
    localStorage.setItem('total_respuestasNull', total_respuestasNull);

    // Función para filtrar por fecha
    async function filtrarFecha() {
        const selectedDate = new Date(filterDate.value);
        if (!isNaN(selectedDate)) {

            // Filtrar encuestas por la fecha seleccionada
            const filteredEncuestas = Encuestas.filter(encuesta => {
                const encuestaDate = new Date(encuesta.Fecha);
                return encuestaDate.toDateString() === selectedDate.toDateString();
            });

            // Actualizar los totales con las encuestas filtradas
            pTotalEncuentas.textContent = filteredEncuestas.length;
            pTotalContestadas.textContent = contarRespuestasValidas(filteredEncuestas);

            // Cálculos de las respuestas filtradas
            total_respuestasValidas = contarRespuestasValidas(filteredEncuestas);
            total_respuestasNull = contarRespuestasNull(filteredEncuestas);
            respuestas_por_tipo = contarRespuestasPorTipo(filteredEncuestas);
            total_RespuestasPorPregunta = contarRespuestasPorPregunta(filteredEncuestas);
            total_RespuestasPregunta5 = contarRespuestaPregunta5(filteredEncuestas);

            // Cargar las gráficas con los datos filtrados
            await cargarGraficas(total_respuestasValidas, total_respuestasNull, respuestas_por_tipo, total_RespuestasPorPregunta, total_RespuestasPregunta5)
        } else {
            console.error("Fecha no válida");
        }
    }


    document.getElementById('filtrarRango').addEventListener('click', () => {
            
        const fechaInicio = new Date(document.getElementById('filterDateInicio').value);
        const fechaFin = new Date(document.getElementById('filterDateFin').value);
    
        // Llama a la función de filtrado
        filtrarPorFechas(fechaInicio, fechaFin);
    })


    async function filtrarPorFechas(fechaInicio, fechaFin){

        console.log(fechaInicio)
        console.log(fechaFin)
        // Filtra los datos dentro del rango de fechas
        const datosFiltrados = Encuestas.filter(item => {
            const fecha = new Date(item.Fecha); // Asumiendo que cada item tiene una propiedad "fecha"
            return fecha >= fechaInicio && fecha <= fechaFin;
        });

        pTotalEncuentas.textContent = datosFiltrados.length;
        pTotalContestadas.textContent = contarRespuestasValidas(datosFiltrados);

        // Cálculos de las respuestas filtradas
        total_respuestasValidas = contarRespuestasValidas(datosFiltrados);
        total_respuestasNull = contarRespuestasNull(datosFiltrados);
        respuestas_por_tipo = contarRespuestasPorTipo(datosFiltrados);
        total_RespuestasPorPregunta = contarRespuestasPorPregunta(datosFiltrados);
        total_RespuestasPregunta5 = contarRespuestaPregunta5(datosFiltrados);

        // Cargar las gráficas con los datos filtrados
        await cargarGraficas(total_respuestasValidas, total_respuestasNull, respuestas_por_tipo, total_RespuestasPorPregunta, total_RespuestasPregunta5)
   
    }


    filterDate.addEventListener('change', filtrarFecha);

    // Cargar gráficas inicialmente
    await cargarGraficas(total_respuestasValidas, total_respuestasNull, respuestas_por_tipo, total_RespuestasPorPregunta, total_RespuestasPregunta5)
});
