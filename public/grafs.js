const backgroundColors = [
    '#4caf50', // Totalmente Satisfecho
    '#2196f3', // Satisfecho
    '#ffeb3b', // Neutral
    '#ff9800', // Insatisfecho
    '#f44336'  // Totalmente Insatisfecho
];

const charts = {}; // Objeto para almacenar los gráficos existentes

export function cargarGraficas(
    total_respuestasValidas,
    total_respuestasNull,
    respuestas_por_tipo,
    total_RespuestasPorPregunta,
    total_RespuestasPregunta5
) {
    return new Promise((resolve, reject) => {
        try {
            // Función para crear gráficos de barras
            const crearGraficoBarras = (context, etiquetas, datos, title, chartId) => {
                // Si ya existe un gráfico con el mismo ID, destrúyelo
                if (charts[chartId]) {
                    charts[chartId].destroy();
                }

                // Crear nuevo gráfico y almacenarlo en el objeto
                charts[chartId] = new Chart(context, {
                    type: "bar",
                    data: {
                        labels: etiquetas,
                        datasets: [{
                            label: title,
                            data: datos,
                            backgroundColor: backgroundColors,
                            borderColor: ["#e05a0c"],
                            borderWidth: 1,
                        }],
                    },
                    options: {
                        responsive: true,
                        scales: {
                            x: {
                                ticks: {
                                    color: "#374151",
                                    font: { size: 14, weight: "bold" },
                                },
                            },
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    color: "#374151",
                                    font: { size: 14, weight: "bold" },
                                },
                            },
                        },
                        plugins: {
                            datalabels: {
                                color: "#000",
                                anchor: "end",
                                align: "top",
                                font: { weight: "bold", size: 12 },
                                formatter: (value) => value,
                            },
                        },
                    },
                    plugins: [ChartDataLabels],
                });
            };

            // GRAFICO BARRAS Respuestas del Usuario
            const graficoBarrasRespuestas = document.getElementById("respuestaBarChart").getContext("2d");
            const etiquetas = respuestas_por_tipo.map((item) => item.id);
            const datos = respuestas_por_tipo.map((item) => item.value);
            crearGraficoBarras(graficoBarrasRespuestas, etiquetas, datos, "Número de respuestas", "respuestaBarChart");

            // GRAFICO PORCENTAJES
            const totalResponses = respuestas_por_tipo.reduce((sum, category) => sum + category.value, 0);
            const percentages = respuestas_por_tipo.map((category) => ({
                id: category.id,
                percentage: totalResponses > 0 ? Math.round((category.value / totalResponses) * 100) : 0,
            }));

            const ctx = document.getElementById("graficoPorcentaje").getContext("2d");
            const labels = percentages.map((category) => category.id);
            const values = percentages.map((category) => category.percentage);

            // GRAFICO DE TARTA
            if (charts["graficoPorcentaje"]) {
                charts["graficoPorcentaje"].destroy(); // Destruir gráfico existente si lo hay
            }
            charts["graficoPorcentaje"] = new Chart(ctx, {
                type: "pie",
                data: {
                    labels: labels,
                    datasets: [{
                        label: "Nivel de Satisfacción (%)",
                        data: values,
                        backgroundColor: backgroundColors,
                        borderColor: "#ffffff",
                        borderWidth: 1,
                    }],
                },
                options: {
                    responsive: true,
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: (context) => `${context.label || ""}: ${context.parsed || 0}%`,
                            },
                        },
                        legend: { position: "bottom" },
                        title: { display: false, text: "Distribución de Satisfacción" },
                        datalabels: {
                            color: '#ffffff',
                            font: {
                                weight: 'bold',
                                size: 10, // Ajusta el tamaño del texto si lo deseas
                            },
                            anchor: 'center', // Centra el texto dentro de cada sección
                            align: 'center',  // Alinea el texto en el centro
                            formatter: (value, context) => {
                                // Mostrar el porcentaje junto con la etiqueta
                                return `${value}%`;
                            },
                        },
                    },
                },
                plugins: [ChartDataLabels],
            });


            // Datos de preguntas
            const etiquetasPregunta1 = ["Totalmente Satisfecho", "Satisfecho", "Insatisfecho", "Totalmente Insatisfecho"];
            const datosPreguntas = total_RespuestasPorPregunta.map(p => [
                p["Totalmente Satisfecho"],
                p["Satisfecho"],
                p["Insatisfecho"],
                p["Totalmente Insatisfecho"],
            ]);

            // GRAFICOS PARA CADA PREGUNTA
            for (let i = 0; i < 4; i++) {
                const graficoBarraPregunta = document.getElementById(`respuestaPregunta${i + 1}`).getContext("2d");
                crearGraficoBarras(graficoBarraPregunta, etiquetasPregunta1, datosPreguntas[i], "Número de respuestas", `respuestaPregunta${i + 1}`);
            }


            if (charts["Pregunta5BarChart"]) {
                charts["Pregunta5BarChart"].destroy(); // Destruir gráfico existente si lo hay
            }
            const graficoBarraPregunta5 = document.getElementById("pregunta5").getContext("2d");
            charts['Pregunta5BarChart'] = new Chart(graficoBarraPregunta5, {
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







            resolve();
        } catch (error) {
            reject(error);
        }
    });
}
