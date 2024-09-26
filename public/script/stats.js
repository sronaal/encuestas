import('./grafs.js')

let totalRespuestas;
let totalNoRespondidas
let Encuentas = []


document.addEventListener('DOMContentLoaded', function () {
    let pTotalEncuentas = document.getElementById('totalEncuentas')
    let pTotalContestadas = document.getElementById('totalContestadas')
    let ptotalNoContestadas = document.getElementById('totalNoContestadas')


    let Encuentas = []

    obtenerEncuentas()

    async function obtenerEncuentas() {


        try {

            let encuentas = await fetch('https://200.91.192.58:8081/encuestas')


            Encuentas = await encuentas.json()
            localStorage.setItem('encuestas', JSON.stringify(Encuentas))

            console.log(Encuentas)
            pTotalEncuentas.textContent = Encuentas.length

            pTotalContestadas.textContent = contarRespuestasValidas()
            ptotalNoContestadas.textContent = contarRespuestasNull()
            //localStorage.setItem('totalRespuestas', contarRespuestasValidas())
            totalRespuestas = contarRespuestasValidas()
            totalNoRespondidas = contarRespuestasNull()
            //localStorage.setItem('totalNoRespondidas', contarRespuestasNull())
            let meses = JSON.stringify(groupByMonth())

            localStorage.setItem('meses', JSON.stringify(groupByMonth()))
            localStorage.setItem('total_encuentas', Encuentas.length)
            localStorage.setItem('data_respuestas', JSON.stringify(contarRespuestasPorTipo(Encuentas)))
        } catch (error) {

        }


        console.log(groupByMonth())
    }


        function contarRespuestasValidas() {
            let total = 0
            Encuentas.forEach(item => {
                // Recorrer cada propiedad del objeto y verificar si es una respuesta válida
                for (let key in item) {
                    if (key.startsWith('Respuesta') && item[key] !== null && item[key] !== undefined) {
                        total++;
                    }
                }
            });

            return total;
        }

        function contarRespuestasNull() {
            let total = 0
            Encuentas.forEach(item => {
                for (let key in item) {
                    if (key.startsWith('Respuesta') && item[key] == null) {
                        total++;
                    }
                }
            })

            return total

        }

        function groupByMonth() {
            return Encuentas.reduce((acc, item) => {
                // Extraer el año y el mes de la fecha
                const date = new Date(item.Fecha);
                const yearMonth = `${date.getFullYear()}-${date.getMonth() + 1}`; // Formato 'YYYY-M'

                // Inicializar el acumulador para ese año-mes si no existe
                if (!acc[yearMonth]) {
                    acc[yearMonth] = 0;
                }

                // Incrementar el conteo de encuestas para ese año-mes
                acc[yearMonth]++;

                return acc;
            }, {});
        }




    const local_TotalRespondidas = localStorage.getItem('totalRespuestas')
    const local_TotalNoRespondidas = localStorage.getItem('totalNoRespondidas')
    const encuestas = JSON.parse(localStorage.getItem('encuestas'))
    console.log(encuestas)

    const local_dataRespuestas = contarRespuestasPorTipo(encuestas)

    function contarRespuestasPorTipo(encuestas) {


        let conteoRespuestas = {
            "Totalmente Satisfecho": 0,
            "Satisfecho": 0,
            "Neutral": 0,
            "Insatisfecho": 0,
            "Totalmente Insatisfecho": 0
        };

        // Recorrer cada encuesta
        encuestas.forEach(encuesta => {
            // Iterar sobre las respuestas de texto en la encuesta
            for (let i = 1; i <= 5; i++) {
                let textoRespuesta = encuesta[`TextoRespuesta${i}`];

                if (textoRespuesta && textoRespuesta !== "No Respondido") {
                    // Incrementar el contador para la respuesta correspondiente
                    if (conteoRespuestas[textoRespuesta] !== undefined) {
                        conteoRespuestas[textoRespuesta]++;
                    }
                }
            }
        });

        // Convertir el objeto de conteo a un array, manteniendo el orden específico
        let arrayRespuestas = [
            { id: "Totalmente Satisfecho", nested: { value: conteoRespuestas["Totalmente Satisfecho"] } },
            { id: "Satisfecho", nested: { value: conteoRespuestas["Satisfecho"] } },
            { id: "Neutral", nested: { value: conteoRespuestas["Neutral"] } },
            { id: "Insatisfecho", nested: { value: conteoRespuestas["Insatisfecho"] } },
            { id: "Totalmente Insatisfecho", nested: { value: conteoRespuestas["Totalmente Insatisfecho"] } }
        ];

        return arrayRespuestas;
    }


    cargarGraficos()

    function cargarGraficos() {

        const graficoPorcentaje = document.getElementById('surveyPieChart').getContext('2d');

        const surveyPieChart = new Chart(graficoPorcentaje, {
            type: 'pie',
            data: {
                labels: ['Respondidas', 'No Respondidas'],
                datasets: [{
                    data: [totalRespuestas, totalNoRespondidas], 
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



    }























})