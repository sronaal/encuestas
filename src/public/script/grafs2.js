document.addEventListener('DOMContentLoaded', function () {
    // Datos de ejemplo para Encuestas por Agente Según el Mes
    var ctx1 = document.getElementById('encuestasPorAgenteChart').getContext('2d');
    var encuestasPorAgenteChart = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            datasets: [
                {
                    label: 'Encuestas por Agente',
                    data: [30, 40, 35, 50, 65, 70, 80, 75, 85, 90, 100, 110], // Cambia estos valores con los datos reales
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    beginAtZero: true
                }
            }
        }
    });

    // Datos de ejemplo para Nivel de Satisfacción por Agente
    var ctx2 = document.getElementById('satisfaccionPorAgenteChart').getContext('2d');
    var satisfaccionPorAgenteChart = new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: ['Totalmente Satisfecho', 'Satisfecho', 'Neutral', 'Insatisfecho', 'Totalmente Insatisfecho'],
            datasets: [
                {
                    label: 'Nivel de Satisfacción por Agente',
                    data: [20, 30, 25, 15, 10], // Cambia estos valores con los datos reales
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 206, 86, 0.2)'
                    ],
                    borderColor: [
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true
        }
    });
});
