



document.addEventListener('DOMContentLoaded', function () {
   
    const totalEncuestas = localStorage.getItem('total_encuestas');
    document.getElementById('totalEncuentas').textContent = totalEncuestas;

    const totalRespuestas = localStorage.getItem('totalRespuestas');
    document.getElementById('totalContestadas').textContent = totalRespuestas;

    const totalNoRespondidas = localStorage.getItem('totalNoRespondidas');
    document.getElementById('totalNoContestadas').textContent = totalNoRespondidas;

    const filterResponse = document.getElementById('filterResponse');
    const exportButton = document.getElementById('exportButton');

    // Inicializa DataTables
    $('#tabla-encuestas').DataTable({
        "scrollY": 400,

        "responsive": true,
        "paging": true,
        "searching": false,
        "info": false,
        "lengthChange": true, // Opcional, para ocultar el selector de número de filas por página
    });

    function generarTabla(encuestas) {
        const tabla = document.getElementById('tabla-encuestas').querySelector('tbody');
        tabla.innerHTML = encuestas.map((encuesta, index) => `
            <tr class="${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}">
                <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">${encuesta.Fecha}</td>
                <td class="px-6 py-4 text-sm text-gray-500 whitespace-pre-linea">${encuesta.agente}</td>
                <td class="px-6 py-4 text-sm text-gray-500 overflow-scroll  whitespace-pre	">${encuesta.Pregunta1}</td>
                <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">${encuesta.Respuesta1}</td>
                <td class="py-2 px-6 border-b text-gray-700 text-sm">${encuesta.Pregunta2}</td>
                <td class="py-2 px-4 border-b text-gray-700 text-sm">${encuesta.Respuesta2}</td>
                <td class="py-2 px-6 border-b text-gray-700 text-sm">${encuesta.Pregunta3}</td>
                <td class="py-2 px-4 border-b text-gray-700 text-sm">${encuesta.Respuesta3}</td>
                <td class="py-2 px-6 border-b text-gray-700 text-sm">${encuesta.Pregunta4}</td>
                <td class="py-2 px-4 border-b text-gray-700 text-sm">${encuesta.Respuesta4}</td>
                <td class="py-2 px-6 border-b text-gray-700 text-sm">${encuesta.Pregunta5}</td>
                <td class="py-2 px-4 border-b text-gray-700 text-sm">${encuesta.Respuesta5}</td>
            </tr>
        `).join('');
        
        // Reinitialize DataTables after updating the table
        $('#tabla-encuestas').DataTable().clear().rows.add($('#tabla-encuestas tbody tr')).draw();
    }

    let encuestas = JSON.parse(localStorage.getItem('encuestas'));
    generarTabla(encuestas);

    filterResponse.addEventListener('change', function () {
        const selectedResponse = filterResponse.value.toLowerCase();
        const table = $('#tabla-encuestas').DataTable();
        
        table.search(selectedResponse).draw();
    });

    exportButton.addEventListener('click', function () {
        // Recolectar filas y convertir a CSV
        const rows = Array.from(document.querySelectorAll('#tabla-encuestas tbody tr'));
        let csvContent = 'Fecha de Encuesta,Agente,Pregunta 1,Respuesta 1,Pregunta 2,Respuesta 2,Pregunta 3,Respuesta 3,Pregunta 4,Respuesta 4,Pregunta 5,Respuesta 5\n';
        
        rows.forEach(row => {
            const cols = Array.from(row.querySelectorAll('td')).map(col => col.textContent.replace(/,/g, ''));
            csvContent += cols.join(',') + '\n';
        });

        // Crear y descargar archivo CSV
        const csvBlob = new Blob([csvContent], { type: 'text/csv' });
        const csvUrl = URL.createObjectURL(csvBlob);
        const a = document.createElement('a');
        a.href = csvUrl;
        a.download = 'encuestas.csv';
        a.click();
        URL.revokeObjectURL(csvUrl);
    });
});
