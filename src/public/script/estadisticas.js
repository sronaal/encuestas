let pTotalEncuentas = document.getElementById('totalEncuentas')
let pTotalContestadas = document.getElementById('totalContestadas')
let ptotalNoContestadas = document.getElementById('totalNoContestadas')

let Encuentas = []
export let totalRespuestas = 0
export let totalNoRespuestas = 0


export  function init(){

    obtenerEncuentas()

}


export async function obtenerEncuentas() {


    let encuentas = await fetch('http://localhost:80/encuentas')


    Encuentas = await encuentas.json()
    pTotalEncuentas.textContent = Encuentas.length
    console.log(Encuentas)
    pTotalContestadas.textContent = contarRespuestasValidas()
    ptotalNoContestadas.textContent = contarRespuestasNull()
    localStorage.setItem('totalRespuestas', contarRespuestasValidas())
    localStorage.setItem('totalNoRespondidas', contarRespuestasNull())
    localStorage.setItem('meses', groupByMonth())
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
