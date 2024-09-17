import { obtenerEncuentas } from './script/service.js'
document.addEventListener('DOMContentLoaded', async () => {
    let encuestas = await obtenerEncuentas();

    let pTotalEncuentas = document.getElementById('totalEncuentas')
    let pTotalContestadas = document.getElementById('totalContestadas')
    let ptotalNoContestadas = document.getElementById('totalNoContestadas')

    pTotalEncuentas.textContent = localStorage.getItem('totalEncuetas')
    pTotalContestadas.textContent = localStorage.getItem('total_respuestasValidas')
    ptotalNoContestadas.textContent = localStorage.getItem('total_respuestasNull')

    const tableBody = document.getElementById('tableBody');
    const filterCallerID = document.getElementById('filterCallerID');
    const exportCSV = document.getElementById('exportCSV');

    function renderTable(filteredData) {
        tableBody.innerHTML = '';
        filteredData.forEach((item, index) => {
            const row = `
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${index + 1}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${item.id}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${item.Extension}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${item.Fecha}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${item.Hora}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${item.TextoRespuesta1}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${item.TextoRespuesta2}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${item.TextoRespuesta3}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${item.TextoRespuesta4}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${item.TextoRespuesta5}</td>
                </tr>
            `;
            tableBody.insertAdjacentHTML('beforeend', row);
        });
    }

    // Filtro por CallerID
    filterCallerID.addEventListener('input', (e) => {
        const value = e.target.value;
        const filteredData = encuestas.filter(item => item.CallerID.includes(value));
        renderTable(filteredData);
    });


    exportCSV.addEventListener('click', () => {
        exportTableToCSV(encuestas, 'encuestas.csv');
    });


    function exportTableToCSV(data, filename) {
        const csv = data.map(item => [
            item.id, item.Extension, item.Fecha, item.Hora, 
            item.TextoRespuesta1, item.TextoRespuesta2, item.TextoRespuesta3, 
            item.TextoRespuesta4, item.TextoRespuesta5
        ]);
        const csvContent = "data:text/csv;charset=utf-8,"
            + ["#ID,Extension,Fecha,Hora,Respuesta 1,Respuesta 2,Respuesta 3,Respuesta 4,Respuesta 5"]
                .concat(csv.map(e => e.join(",")))
                .join("\n");

        const link = document.createElement('a');
        link.setAttribute('href', encodeURI(csvContent));
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // Renderizar la tabla con todos los datos al cargar la página
    renderTable(encuestas);
});