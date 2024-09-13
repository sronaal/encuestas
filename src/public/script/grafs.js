

const local_TotalRespondidas = localStorage.getItem('totalRespuestas')
const local_TotalNoRespondidas = localStorage.getItem('totalNoRespondidas')
const local_dataRespuestas = JSON.parse(localStorage.getItem("data_respuestas"))
console.log(local_dataRespuestas)
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
                    // Calcular el total
                    const total = context.chart.data.datasets[0].data.reduce((acc, val) => acc + val, 0);
                    // Calcular el porcentaje
                    const percentage = ((value / total) * 100).toFixed(1);
                    return `${percentage}% (${value})`; // Mostrar porcentaje y valor
                },
                font: {
                    weight: 'bold',
                    size: 12, // Tamaño del texto
                }
            }
        }
    }
});



const DoughnutRespuestas = document.getElementById('respuestasDoughnutChart').getContext('2d')
const values = local_dataRespuestas.map(item => item.nested.value);
// Configurar el gráfico
const DoughnutChart = new Chart(DoughnutRespuestas, {
    type: 'doughnut',
    data: {
        datasets: [{
            label: '',
            data: values, // Usamos los valores extraídos
            backgroundColor: [
                'rgb(19, 247, 19)',      // Verde - Totalmente Satisfecho
                'rgb(144, 238, 144)',    // Verde claro - Satisfecho
                'rgb(112, 112, 112)',    // Gris - Neutral
                'rgb(255, 205, 86)',     // Amarillo - Insatisfecho
                'rgb(247, 16, 16)'       // Rojo - Totalmente Insatisfecho
            ]
        }],
        labels: local_dataRespuestas.map(item => item.id) // Usamos los ids como etiquetas
    },
    options: {
        plugins: {
            legend: {
                display: true // Muestra la leyenda
            },
            tooltip: {
                enabled: true // Habilita tooltips
            },
            datalabels: {
                display: true,
                color: '#000',
                font: {
                    weight: 'bold'
                },
                formatter: (value, context) => {
                    // Mostramos el valor y la etiqueta correctamente
                    let label = context.chart.data.labels[context.dataIndex];
                    return `${label}: ${value}`;
                }
            }
        }
    },
    plugins: [ChartDataLabels] // Añade el plugin ChartDataLabels para mostrar los valores dentro del gráfico
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


const ctx = document.getElementById('graficoDiasSemana').getContext('2d');
const graficoDiasSemana = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
        datasets: [{
            label: 'Cantidad de Encuestas',
            data: [12, 19, 3, 5, 2, 3, 7], // Cambia estos valores con los datos reales
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});


