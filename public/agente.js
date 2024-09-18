import { obtenerEncuentas } from "./script/service.js";
import { contarRespuestaPorAgente } from './script/funciones.js'

document.addEventListener('DOMContentLoaded', async () => {

    let pTotalEncuentas = document.getElementById('totalEncuentas')
    let pTotalContestadas = document.getElementById('totalContestadas')
    let ptotalNoContestadas = document.getElementById('totalNoContestadas')

    pTotalEncuentas.textContent = localStorage.getItem('totalEncuetas')
    pTotalContestadas.textContent = localStorage.getItem('total_respuestasValidas')
    ptotalNoContestadas.textContent = localStorage.getItem('total_respuestasNull')

    let encuestas = await obtenerEncuentas()

    let data = contarRespuestaPorAgente(encuestas)
    const labels = data.map(item => item.agent);

    const verySatisfactory = data.map(item => item.verySatisfactory);
    const satisfactory = data.map(item => item.satisfactory);
    const neutral = data.map(item => item.neutral);
    const dissatisfactory = data.map(item => item.dissatisfactory);
    const veryDissatisfactory = data.map(item => item.veryDissatisfactory);

    const total = data.map(item => 
        item.verySatisfactory + 
        item.satisfactory + 
        item.neutral + 
        item.dissatisfactory + 
        item.veryDissatisfactory
    );

    const ctx = document.getElementById('responsesChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Totalmente Satisfactorio',
                    data: verySatisfactory,
                    backgroundColor: 'rgba(0, 128, 0, 0.6)',
                },
                {
                    label: 'Satisfactorio',
                    data: satisfactory,
                    backgroundColor: 'rgba(255, 165, 0, 0.6)',
                },
                {
                    label: 'Neutral',
                    data: neutral,
                    backgroundColor: 'rgba(128, 128, 128, 0.6)',
                },
                {
                    label: 'Insatisfactorio',
                    data: dissatisfactory,
                    backgroundColor: 'rgba(255, 69, 0, 0.6)',
                },
                {
                    label: 'Totalmente Insatisfactorio',
                    data: veryDissatisfactory,
                    backgroundColor: 'rgba(255, 0, 0, 0.6)',
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += context.parsed.y;
                            }
                            // Add the total for each agent
                            const agentIndex = context.dataIndex;
                            label += ` (Total: ${total[agentIndex]})`;
                            return label;
                        }
                    }
                }
            },
            scales: {
                x: {
                    stacked: true
                },
                y: {
                    stacked: true,
                    beginAtZero: true
                }
            }
        }
    });
});
