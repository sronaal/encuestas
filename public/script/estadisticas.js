let pTotalEncuentas = document.getElementById('totalEncuentas')
let pTotalContestadas = document.getElementById('totalContestadas')
let ptotalNoContestadas = document.getElementById('totalNoContestadas')


let Encuentas = []
export let totalRespuestas = 0
export let totalNoRespuestas = 0

export  function init(){

   obtenerEncuentas()
    
    //mostrarPorcentajeEncuentas()

}


export async function obtenerEncuentas() {


    let encuentas = await fetch('https://localhost:8081/encuestas')


    Encuentas = await encuentas.json()
    console.log(Encuentas)
    pTotalEncuentas.textContent = Encuentas.length

    pTotalContestadas.textContent = contarRespuestasValidas()
    ptotalNoContestadas.textContent = contarRespuestasNull()
    localStorage.setItem('totalRespuestas', contarRespuestasValidas())
    localStorage.setItem('totalNoRespondidas', contarRespuestasNull())
    localStorage.setItem('meses', groupByMonth())
    localStorage.setItem('total_encuentas', Encuentas.length)
    localStorage.setItem('data_respuestas', JSON.stringify(contarRespuestasPorTipo(Encuentas)))
    localStorage.setItem('encuestas', JSON.stringify(Encuentas))


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
        { id: "Totalmente Satisfecho", nested: { value: conteoRespuestas["Totalmente Satisfecho"]} },
        { id: "Satisfecho", nested: {value: conteoRespuestas["Satisfecho"] }},
        { id: "Neutral", nested: {value: conteoRespuestas["Neutral"] }},
        { id: "Insatisfecho", nested: {value :  conteoRespuestas["Insatisfecho"]} },
        { id: "Totalmente Insatisfecho", nested: { value : conteoRespuestas["Totalmente Insatisfecho"]} }
    ];

    return arrayRespuestas;
}





