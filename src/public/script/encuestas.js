document.addEventListener('DOMContentLoaded', function () {
    const filterInput = document.getElementById('filterInput');
    const table = document.getElementById('surveyTable');
    const exportButton = document.getElementById('exportButton');

    // Filtro en la tabla
    filterInput.addEventListener('input', function () {
        const filterText = filterInput.value.toLowerCase();
        const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
        
        for (let row of rows) {
            const agentName = row.cells[3].textContent.toLowerCase();
            if (agentName.includes(filterText)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        }
    });

    // Exportar a CSV
    exportButton.addEventListener('click', function () {
        const rows = Array.from(table.querySelectorAll('tr'));
        const csvContent = rows.map(row => {
            const cols = Array.from(row.querySelectorAll('td, th')).map(col => col.textContent);
            return cols.join(',');
        }).join('\n');

        const csvBlob = new Blob([csvContent], { type: 'text/csv' });
        const csvUrl = URL.createObjectURL(csvBlob);
        const a = document.createElement('a');
        a.href = csvUrl;
        a.download = 'encuestas.csv';
        a.click();
        URL.revokeObjectURL(csvUrl);
    });


    function generarTabla(encuestas) {
        const tabla = document.getElementById('tabla-encuestas').querySelector('tbody');
        tabla.innerHTML = encuestas.map((encuesta, index) => `
            <tr class="${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}">
                <td class="py-2 px-4 border-b text-gray-700 text-sm">${encuesta.Fecha}</td>
                <td class="py-2 px-4 border-b text-gray-700 text-sm">${encuesta.pregunta}</td>
                <td class="py-2 px-4 border-b text-gray-700 text-sm">${encuesta.Respuesta1}</td>
                            <td class="py-2 px-4 border-b text-gray-700 text-sm">${encuesta.pregunta}</td>
                <td class="py-2 px-4 border-b text-gray-700 text-sm">${encuesta.Respuesta2}</td>
                            <td class="py-2 px-4 border-b text-gray-700 text-sm">${encuesta.pregunta}</td>
                <td class="py-2 px-4 border-b text-gray-700 text-sm">${encuesta.Respuesta3}</td>
                            <td class="py-2 px-4 border-b text-gray-700 text-sm">${encuesta.pregunta}</td>
                <td class="py-2 px-4 border-b text-gray-700 text-sm">${encuesta.Respuesta4}</td>
                            <td class="py-2 px-4 border-b text-gray-700 text-sm">${encuesta.pregunta}</td>
                <td class="py-2 px-4 border-b text-gray-700 text-sm">${encuesta.Respuesta5}</td>
                <td class="py-2 px-4 border-b text-gray-700 text-sm">${encuesta.agente}</td>
            </tr>
        `).join('');
    }

    let encuestas = JSON.parse(localStorage.getItem('encuestas'))
    generarTabla(encuestas)
    
});
