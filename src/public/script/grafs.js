

const local_TotalRespondidas = localStorage.getItem('totalRespuestas')
const local_TotalNoRespondidas = localStorage.getItem('totalNoRespondidas')

const graficoPorcentaje = document.getElementById('surveyPieChart').getContext('2d');
// Crear el gráfico
const surveyPieChart = new Chart(graficoPorcentaje, {
    type: 'pie',
    data: {
        labels: ['Respondidas', 'No Respondidas'],
        datasets: [{
            data: [local_TotalRespondidas, local_TotalNoRespondidas], // Datos
            backgroundColor: ['#f97316', '#6b7280'], // Colores para las partes de la torta
            borderWidth: 1,
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        const label = tooltipItem.label || '';
                        const value = tooltipItem.raw;
                        return `${label}: ${value}`;
                    }
                }
            },
            datalabels: {
                color: '#fff', // Color del texto
                anchor: 'center', // Posición de las etiquetas
                align: 'center',
                formatter: (value, context) => {
                    const total = context.chart.data.datasets[0].data.reduce((acc, val) => acc + val, 0);
                    const percentage = ((value / total) * 100).toFixed(1);
                    return `${percentage}%`; // Mostrar porcentaje
                },
                font: {
                    weight: 'bold',
                    size: 10,
                }
            }
        }
    },
    plugins: [ChartDataLabels] // Registrar el plugin
});



// Bar Chart for Surveys Per Month
const surveyBarCtx = document.getElementById('surveyBarChart').getContext('2d');
const surveyBarChart = new Chart(surveyBarCtx, {
    type: 'bar',
    data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets: [{
            label: 'Encuestas',
            data: [50, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170],
            backgroundColor: '#3b82f6', // Color de las barras
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});