import { obtenerEncuentas } from './script/service.js';

document.addEventListener('DOMContentLoaded', async () => {


    let pTotalEncuentas = document.getElementById('totalEncuentas')
    let pTotalContestadas = document.getElementById('totalContestadas')

    pTotalEncuentas.textContent = localStorage.getItem('totalEncuetas')
    pTotalContestadas.textContent = localStorage.getItem('total_respuestasValidas')

    const filterCallerID = document.getElementById('filterCallerID');
    const filterResponse = document.getElementById('filterResponse');
    const filterDate = document.getElementById('filterDate');
    const exportCSV = document.getElementById('exportCSV');

    const table = $('#dataTable').DataTable({
        "paging": true,
        "searching": true,
        "ordering": true,
        "info": true,
        "lengthChange": true,
        "language": {
            "paginate": {
                "next": "Siguiente",
                "previous": "Anterior"
            },
            "info": "Mostrando _START_ a _END_ de _TOTAL_ entradas",
            "infoEmpty": "Mostrando 0 a 0 de 0 entradas"
        },
        "data": [], // Placeholder for data
        "columns": [
            { "data": "index" },
            { "data": "callerID" },
            { "data": "extension" },
            { "data": "date" },
            { "data": "hour" },
            { "data": "response1" },
            { "data": "response2" },
            { "data": "response3" },
            { "data": "response4" },
            { "data": "response5" }
        ]
    });

    function fillTable(data) {
        table.clear();
        table.rows.add(data).draw();
    }

    async function fetchData() {
        try {
            const data = await obtenerEncuentas();

            console.log(data) 
            const formattedData = data.map((item, index) => ({
                index: index + 1,
                callerID: item.CallerID,
                extension: item.Extension,
                date: item.Fecha,
                hour: item.Hora,
                response1: item.TextoRespuesta1,
                response2: item.TextoRespuesta2,
                response3: item.TextoRespuesta3,
                response4: item.TextoRespuesta4,
                response5: item.TextoRespuesta5
            }));
            fillTable(formattedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    function applyFilters() {
        const response = filterResponse.value;
        console.log(response)
        const date = filterDate.value;

        // Apply filters
        table
            .columns([5, 6, 7, 8, 9]).search(response) // Filter by Response
            .columns(3).search(date) // Filter by Date
            .draw();
    }

    filterResponse.addEventListener('change', applyFilters);
    filterDate.addEventListener('change', applyFilters);



    exportCSV.addEventListener('click', () => {
        const csv = Papa.unparse(table.rows().data().toArray());
        const link = document.createElement('a');
        link.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
        link.download = 'encuestas.csv';
        link.click();
    });

    fetchData();
});
