export function cargarGraficas(
    total_respuestasValidas,
    total_respuestasNull,
    respuestas_por_tipo,
    total_RespuestasPorPregunta,
    total_RespuestasPregunta5
) {
    return new Promise((resolve, reject) => {
        // GRAFICO BARRAS  Respuestas del Usuario
        const graficoBarrasRespuestas = document
            .getElementById("respuestaBarChart")
            .getContext("2d");
        const etiquetas = respuestas_por_tipo.map((item) => item.id);
        const datos = respuestas_por_tipo.map((item) => item.value);
        const respuestaBarChar = new Chart(graficoBarrasRespuestas, {
            type: "bar",
            data: {
                labels: etiquetas, // Etiquetas del eje X
                datasets: [
                    {
                        label: "Número de respuestas",
                        data: datos, // Datos en el eje Y
                        backgroundColor: [
                            '#4caf50', // Totalmente Satisfecho
                            '#2196f3', // Satisfecho
                            '#ffeb3b', // Neutral
                            '#ff9800', // Insatisfecho
                            '#f44336'  // Totalmente Insatisfecho

                        ],
                        borderColor: [
                            "#e05a0c", // Bordes
                        ],
                        borderWidth: 1, // Grosor del borde
                    },
                ],
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        ticks: {
                            color: "#374151", // Color de las etiquetas (gris oscuro)
                            font: {
                                size: 14, // Tamaño del texto
                                weight: "bold", // Texto en negrita
                            },
                        },
                    },
                    y: {
                        beginAtZero: true, // El eje Y comienza en 0
                        ticks: {
                            color: "#374151", // Color de las etiquetas (gris oscuro)
                            font: {
                                size: 14, // Tamaño del texto
                                weight: "bold", // Texto en negrita
                            },
                        },
                    },
                },
                plugins: {
                    datalabels: {
                        color: "#000", // Color de los valores
                        anchor: "end", // Posición de la etiqueta
                        align: "top", // Alineación del texto
                        font: {
                            weight: "bold",
                            size: 12,
                        },
                        formatter: function (value, context) {
                            return value; // Mostrar los valores encima de las barras
                        },
                    },
                },
            },
            plugins: [ChartDataLabels], // Habilitar el plugin de datalabels
        });




        const totalResponses = respuestas_por_tipo.reduce(
            (sum, category) => sum + category.value,
            0
        );

        const percentages = respuestas_por_tipo.map((category) => ({
            id: category.id,
            percentage: Math.round((category.value / totalResponses) * 100), // Solo el valor numérico
        }));

        const ctx = document.getElementById("graficoPorcentaje").getContext("2d");
        const labels = percentages.map((category) => category.id);
        const values = percentages.map((category) => category.percentage); // Usa los valores numéricos

        const satisfactionChart = new Chart(ctx, {
            type: "pie",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Nivel de Satisfacción (%)",
                        data: values, // Cambia aquí a values
                        backgroundColor: [
                            '#4caf50', // Totalmente Satisfecho
                            '#2196f3', // Satisfecho
                            '#ffeb3b', // Neutral
                            '#ff9800', // Insatisfecho
                            '#f44336'  // Totalmente Insatisfecho

                        ],
                        borderColor: "#ffffff",
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                const label = context.label || "";
                                const value = context.parsed || 0;
                                return `${label}: ${value}%`;
                            },
                        },
                    },
                    legend: {
                        position: "bottom",
                    },
                    title: {
                        display: false,
                        text: "Distribución de Satisfacción",
                    },
                    datalabels: { // Configuración del plugin de datalabels
                        color: '#ffffff', // Color de las etiquetas
                        formatter: (value, context) => {
                            return `${value}%`; // Formato de la etiqueta
                        },
                        anchor: 'end',
                        align: 'end',
                    },
                },
            },
            plugins: [ChartDataLabels], // Asegúrate de agregar el plugin aquí
        });
    







        const etiquetasPregunta1 = [
            "Totalmente Satisfecho",
            "Satisfecho",
            "Insatisfecho",
            "Totalmente Insatisfecho",
        ];
        const datosPregunta1 = [
            total_RespuestasPorPregunta[0]["Totalmente Satisfecho"],
            total_RespuestasPorPregunta[0]["Satisfecho"],
            total_RespuestasPorPregunta[0]["Insatisfecho"],
            total_RespuestasPorPregunta[0]["Totalmente Insatisfecho"],
        ];

        const datosPregunta2 = [
            total_RespuestasPorPregunta[1]["Totalmente Satisfecho"],
            total_RespuestasPorPregunta[1]["Satisfecho"],
            total_RespuestasPorPregunta[1]["Insatisfecho"],
            total_RespuestasPorPregunta[1]["Totalmente Insatisfecho"],
        ];

        const datosPregunta3 = [
            total_RespuestasPorPregunta[2]["Totalmente Satisfecho"],
            total_RespuestasPorPregunta[2]["Satisfecho"],
            total_RespuestasPorPregunta[2]["Insatisfecho"],
            total_RespuestasPorPregunta[2]["Totalmente Insatisfecho"],
        ];

        const datosPregunta4 = [
            total_RespuestasPorPregunta[3]["Totalmente Satisfecho"],
            total_RespuestasPorPregunta[3]["Satisfecho"],
            total_RespuestasPorPregunta[3]["Insatisfecho"],
            total_RespuestasPorPregunta[3]["Totalmente Insatisfecho"],
        ];

        const datosPregunta5 = [
            total_RespuestasPorPregunta[4]["Totalmente Satisfecho"],
            total_RespuestasPorPregunta[4]["Satisfecho"],
            total_RespuestasPorPregunta[4]["Insatisfecho"],
            total_RespuestasPorPregunta[4]["Totalmente Insatisfecho"],
        ];

        // GRAFICO BARRAS Pregunta 1
        const graficoBarraPregunta1 = document
            .getElementById("respuestaPregunta1")
            .getContext("2d");
        const Pregunta1BarChart = new Chart(graficoBarraPregunta1, {
            type: "bar",
            data: {
                labels: etiquetasPregunta1, // Etiquetas del eje X
                datasets: [
                    {
                        label: "Número de respuestas",
                        data: datosPregunta1, // Datos en el eje Y
                        backgroundColor: [
                            '#4caf50', // Totalmente Satisfecho
                            '#2196f3', // Satisfecho
                            '#ffeb3b', // Neutral
                            '#ff9800', // Insatisfecho
                            '#f44336'  // Totalmente Insatisfecho

                        ],
                        borderColor: [
                            "#e05a0c", // Bordes
                        ],
                        borderWidth: 1, // Grosor del borde
                    },
                ],
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        ticks: {
                            color: "#374151", // Color de las etiquetas (gris oscuro)
                            font: {
                                size: 14, // Tamaño del texto
                                weight: "bold", // Texto en negrita
                            },
                        },
                    },
                    y: {
                        beginAtZero: true, // El eje Y comienza en 0
                        ticks: {
                            color: "#374151", // Color de las etiquetas (gris oscuro)
                            font: {
                                size: 14, // Tamaño del texto
                                weight: "bold", // Texto en negrita
                            },
                        },
                    },
                },
                plugins: {
                    datalabels: {
                        color: "#000", // Color de los valores
                        anchor: "end", // Posición de la etiqueta
                        align: "top", // Alineación del texto
                        font: {
                            weight: "bold",
                            size: 12,
                        },
                        formatter: function (value, context) {
                            return value; // Mostrar los valores encima de las barras
                        },
                    },
                },
            },
            plugins: [ChartDataLabels], // Habilitar el plugin de datalabels
        });

        // GRAFICO BARASS Pregunta 2

        const graficoBarraPregunta2 = document
            .getElementById("respuestaPregunta2")
            .getContext("2d");
        const Pregunta2BarChart = new Chart(graficoBarraPregunta2, {
            type: "bar",
            data: {
                labels: etiquetasPregunta1, // Etiquetas del eje X
                datasets: [
                    {
                        label: "Número de respuestas",
                        data: datosPregunta2, // Datos en el eje Y
                        backgroundColor: [
                            '#4caf50', // Totalmente Satisfecho
                            '#2196f3', // Satisfecho
                            '#ffeb3b', // Neutral
                            '#ff9800', // Insatisfecho
                            '#f44336'  // Totalmente Insatisfecho

                        ],
                        borderColor: [
                            "#e05a0c", // Bordes
                        ],
                        borderWidth: 1, // Grosor del borde
                    },
                ],
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        ticks: {
                            color: "#374151", // Color de las etiquetas (gris oscuro)
                            font: {
                                size: 14, // Tamaño del texto
                                weight: "bold", // Texto en negrita
                            },
                        },
                    },
                    y: {
                        beginAtZero: true, // El eje Y comienza en 0
                        ticks: {
                            color: "#374151", // Color de las etiquetas (gris oscuro)
                            font: {
                                size: 14, // Tamaño del texto
                                weight: "bold", // Texto en negrita
                            },
                        },
                    },
                },
                plugins: {
                    datalabels: {
                        color: "#000", // Color de los valores
                        anchor: "end", // Posición de la etiqueta
                        align: "top", // Alineación del texto
                        font: {
                            weight: "bold",
                            size: 12,
                        },
                        formatter: function (value, context) {
                            return value; // Mostrar los valores encima de las barras
                        },
                    },
                },
            },
            plugins: [ChartDataLabels], // Habilitar el plugin de datalabels
        });

        const graficoBarraPregunta3 = document
            .getElementById("respuestaPregunta3")
            .getContext("2d");
        const Pregunta3BarChart = new Chart(graficoBarraPregunta3, {
            type: "bar",
            data: {
                labels: etiquetasPregunta1, // Etiquetas del eje X
                datasets: [
                    {
                        label: "Número de respuestas",
                        data: datosPregunta3, // Datos en el eje Y
                        backgroundColor: [
                            '#4caf50', // Totalmente Satisfecho
                            '#2196f3', // Satisfecho
                            '#ffeb3b', // Neutral
                            '#ff9800', // Insatisfecho
                            '#f44336'  // Totalmente Insatisfecho

                        ],
                        borderColor: [
                            "#e05a0c", // Bordes
                        ],
                        borderWidth: 1, // Grosor del borde
                    },
                ],
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        ticks: {
                            color: "#374151", // Color de las etiquetas (gris oscuro)
                            font: {
                                size: 14, // Tamaño del texto
                                weight: "bold", // Texto en negrita
                            },
                        },
                    },
                    y: {
                        beginAtZero: true, // El eje Y comienza en 0
                        ticks: {
                            color: "#374151", // Color de las etiquetas (gris oscuro)
                            font: {
                                size: 14, // Tamaño del texto
                                weight: "bold", // Texto en negrita
                            },
                        },
                    },
                },
                plugins: {
                    datalabels: {
                        color: "#000", // Color de los valores
                        anchor: "end", // Posición de la etiqueta
                        align: "top", // Alineación del texto
                        font: {
                            weight: "bold",
                            size: 12,
                        },
                        formatter: function (value, context) {
                            return value; // Mostrar los valores encima de las barras
                        },
                    },
                },
            },
            plugins: [ChartDataLabels], // Habilitar el plugin de datalabels
        });

        const graficoBarraPregunta4 = document
            .getElementById("respuestaPregunta4")
            .getContext("2d");
        const Pregunta4BarChart = new Chart(graficoBarraPregunta4, {
            type: "bar",
            data: {
                labels: etiquetasPregunta1, // Etiquetas del eje X
                datasets: [
                    {
                        label: "Número de respuestas",
                        data: datosPregunta4, // Datos en el eje Y
                        backgroundColor: [
                            '#4caf50', // Totalmente Satisfecho
                            '#2196f3', // Satisfecho
                            '#ffeb3b', // Neutral
                            '#ff9800', // Insatisfecho
                            '#f44336'  // Totalmente Insatisfecho

                        ],
                        borderColor: [
                            "#e05a0c", // Bordes
                        ],
                        borderWidth: 1, // Grosor del borde
                    },
                ],
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        ticks: {
                            color: "#374151", // Color de las etiquetas (gris oscuro)
                            font: {
                                size: 14, // Tamaño del texto
                                weight: "bold", // Texto en negrita
                            },
                        },
                    },
                    y: {
                        beginAtZero: true, // El eje Y comienza en 0
                        ticks: {
                            color: "#374151", // Color de las etiquetas (gris oscuro)
                            font: {
                                size: 14, // Tamaño del texto
                                weight: "bold", // Texto en negrita
                            },
                        },
                    },
                },
                plugins: {
                    datalabels: {
                        color: "#000", // Color de los valores
                        anchor: "end", // Posición de la etiqueta
                        align: "top", // Alineación del texto
                        font: {
                            weight: "bold",
                            size: 12,
                        },
                        formatter: function (value, context) {
                            return value; // Mostrar los valores encima de las barras
                        },
                    },
                },
            },
            plugins: [ChartDataLabels], // Habilitar el plugin de datalabels
        });

        console.log(total_RespuestasPregunta5[0]);
        const graficoBarraPregunta5 = document
            .getElementById("respuestaPregunta5")
            .getContext("2d");
        const Pregunta5BarChart = new Chart(graficoBarraPregunta5, {
            type: "bar",
            data: {
                labels: ["SI", "NO"], // Etiquetas del eje X
                datasets: [
                    {
                        label: "Número de respuestas",
                        data: [
                            total_RespuestasPregunta5[0].SI,
                            total_RespuestasPregunta5[0].NO,
                        ], // Datos en el eje Y
                        backgroundColor: ["#16f91d", "#e11212"],
                        borderColor: [
                            "#e05a0c", // Bordes
                        ],
                        borderWidth: 1, // Grosor del borde
                    },
                ],
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        ticks: {
                            color: "#374151", // Color de las etiquetas (gris oscuro)
                            font: {
                                size: 14, // Tamaño del texto
                                weight: "bold", // Texto en negrita
                            },
                        },
                    },
                    y: {
                        beginAtZero: true, // El eje Y comienza en 0
                        ticks: {
                            color: "#374151", // Color de las etiquetas (gris oscuro)
                            font: {
                                size: 14, // Tamaño del texto
                                weight: "bold", // Texto en negrita
                            },
                        },
                    },
                },
                plugins: {
                    datalabels: {
                        color: "#000", // Color de los valores
                        anchor: "end", // Posición de la etiqueta
                        align: "top", // Alineación del texto
                        font: {
                            weight: "bold",
                            size: 12,
                        },
                        formatter: function (value, context) {
                            return value; // Mostrar los valores encima de las barras
                        },
                    },
                },
            },
            plugins: [ChartDataLabels], // Habilitar el plugin de datalabels
        });
    });
}
