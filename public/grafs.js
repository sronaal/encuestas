export function cargarGraficas(total_respuestasValidas, total_respuestasNull, respuestas_por_tipo) {

    return new Promise((resolve, reject) => {

        const graficoPorcentaje = document.getElementById('surveyPieChart').getContext('2d');
        const surveyPieChart = new Chart(graficoPorcentaje, {
            type: 'pie',
            data: {
                labels: ['Respondidas', 'No Respondidas'],
                datasets: [{
                    data: [total_respuestasValidas, total_respuestasNull], // Datos
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
                            label: function (tooltipItem) {
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
            },
            plugins: [ChartDataLabels] // Registrar el plugin
        });


        const graficoBarrasRespuestas = document.getElementById('respuestaBarChart').getContext('2d');

        // Datos de ejemplo
        const etiquetas = respuestas_por_tipo.map(item => item.id)
        const datos = respuestas_por_tipo.map(item => item.value);


        const respuestaBarChar = new Chart(graficoBarrasRespuestas, {
            type: 'bar',
            data: {
                labels: etiquetas, // Etiquetas del eje X
                datasets: [{
                    label: 'Número de respuestas',
                    data: datos, // Datos en el eje Y
                    backgroundColor: [
                        '#16f91d',
                        '#62ec67',
                        '#7dac7e',
                        '#dcec4d',
                        '#e11212'
                    ],
                    borderColor: [
                        '#e05a0c', // Bordes
                    ],
                    borderWidth: 1, // Grosor del borde
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        ticks: {
                            color: '#374151', // Color de las etiquetas (gris oscuro)
                            font: {
                                size: 14,      // Tamaño del texto
                                weight: 'bold' // Texto en negrita
                            }
                        }
                    },
                    y: {
                        beginAtZero: true, // El eje Y comienza en 0
                        ticks: {
                            color: '#374151', // Color de las etiquetas (gris oscuro)
                            font: {
                                size: 14,      // Tamaño del texto
                                weight: 'bold' // Texto en negrita
                            }
                        }
                    }
                },
                plugins: {
                    datalabels: {
                        color: '#000', // Color de los valores
                        anchor: 'end', // Posición de la etiqueta
                        align: 'top', // Alineación del texto
                        font: {
                            weight: 'bold',
                            size: 12
                        },
                        formatter: function (value, context) {
                            return value; // Mostrar los valores encima de las barras
                        }
                    }
                }
            },
            plugins: [ChartDataLabels] // Habilitar el plugin de datalabels
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


    })
}



