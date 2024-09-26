import { obtenerEncuentas } from "./script/service.js";
import { contarRespuestaPorAgente, contarRespuestasValidas } from './script/funciones.js';

document.addEventListener('DOMContentLoaded', async () => {
    let pTotalEncuentas = document.getElementById('totalEncuentas');
    let pTotalContestadas = document.getElementById('totalContestadas');

    pTotalEncuentas.textContent = localStorage.getItem('totalEncuetas') || 0; // Ajustado para manejar valores nulos
    pTotalContestadas.textContent = localStorage.getItem('total_respuestasValidas') || 0; // Ajustado para manejar valores nulos

    // Obtener encuestas
    let encuestas = await obtenerEncuentas();

    // Función para contar respuestas por agente
    function generarDatosEncuestas(datos) {
        let data = contarRespuestaPorAgente(datos);
        return {
            labels: data.map(item => item.agent),
            verySatisfactory: data.map(item => item.verySatisfactory),
            satisfactory: data.map(item => item.satisfactory),
            neutral: data.map(item => item.neutral),
            dissatisfactory: data.map(item => item.dissatisfactory),
            veryDissatisfactory: data.map(item => item.veryDissatisfactory),
            total: data.map(item =>
                item.verySatisfactory +
                item.satisfactory +
                item.neutral +
                item.dissatisfactory +
                item.veryDissatisfactory
            )
        };
    }

    // Variable para guardar la instancia del gráfico
    let chartInstance = null;

    // Función para cargar la gráfica
    function cargarGrafica(data) {
        const ctx = document.getElementById('responsesChart').getContext('2d');

        // Si ya existe una instancia del gráfico, destrúyela
        if (chartInstance) {
            chartInstance.destroy();
        }

        // Crear un nuevo gráfico
        chartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: [
                    {
                        label: 'Totalmente Satisfactorio',
                        data: data.verySatisfactory,
                        backgroundColor: 'rgba(0, 128, 0, 0.6)',
                    },
                    {
                        label: 'Satisfactorio',
                        data: data.satisfactory,
                        backgroundColor: 'rgba(255, 165, 0, 0.6)',
                    },
                    {
                        label: 'Neutral',
                        data: data.neutral,
                        backgroundColor: 'rgba(128, 128, 128, 0.6)',
                    },
                    {
                        label: 'Insatisfactorio',
                        data: data.dissatisfactory,
                        backgroundColor: 'rgba(255, 69, 0, 0.6)',
                    },
                    {
                        label: 'Totalmente Insatisfactorio',
                        data: data.veryDissatisfactory,
                        backgroundColor: 'rgba(255, 0, 0, 0.6)',
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        stacked: true, // Apilar las barras
                    },
                    y: {
                        stacked: true, // Apilar los valores
                    },
                },
                plugins: [ChartDataLabels] // Asegúrate de tener el plugin activado
            }
        });
    }

    // Inicializar los datos y cargar gráfica
    let datosEncuestas = generarDatosEncuestas(encuestas);
    cargarGrafica(datosEncuestas);

    // Filtrar encuestas por rango de fechas
    document.getElementById('filtrarRango').addEventListener('click', async () => {
        const fechaInicio = new Date(document.getElementById('filterDateInicio').value);
        const fechaFin = new Date(document.getElementById('filterDateFin').value);

        const datosFiltrados = encuestas.filter(item => {
            const fecha = new Date(item.Fecha); // Ajusta esto según el campo de fecha en los datos
            return fecha >= fechaInicio && fecha <= fechaFin;
        });

        // Actualizar el total de encuestas y respuestas contestadas
        pTotalEncuentas.textContent = datosFiltrados.length;
        pTotalContestadas.textContent = contarRespuestasValidas(datosFiltrados);

        // Generar datos filtrados y recargar gráfica
        let datosFiltradosEncuestas = generarDatosEncuestas(datosFiltrados);
        cargarGrafica(datosFiltradosEncuestas);
    });
});
