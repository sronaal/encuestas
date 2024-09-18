export function contarRespuestasValidas(encuestas) {
    let total = 0
    encuestas.forEach(item => {
        // Recorrer cada propiedad del objeto y verificar si es una respuesta válida
        for (let key in item) {
            if (key.startsWith('Respuesta') && item[key] !== null && item[key] !== undefined) {
                total++;
            }
        }
    });

    return total;
}

export function contarRespuestasNull(encuestas) {
    let total = 0
    encuestas.forEach(item => {
        for (let key in item) {
            if (key.startsWith('Respuesta') && item[key] == null) {
                total++;
            }
        }
    })

    return total

}

export function groupByMonth(encuestas) {
    return encuestas.reduce((acc, item) => {
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


export function contarRespuestasPorTipo(encuestas) {


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
        { id: "Totalmente Satisfecho",value: conteoRespuestas["Totalmente Satisfecho"]  },
        { id: "Satisfecho", value: conteoRespuestas["Satisfecho"] },
        { id: "Neutral",  value: conteoRespuestas["Neutral"] },
        { id: "Insatisfecho", value: conteoRespuestas["Insatisfecho"] },
        { id: "Totalmente Insatisfecho", value: conteoRespuestas["Totalmente Insatisfecho"] }
    ];

    return arrayRespuestas;
}

export const contarRespuestaPorAgente = (encuestas) => {
    // Inicializamos un objeto para almacenar el conteo de respuestas por agente
    const responseCounts = {};

    // Definimos los tipos de respuestas
    const responseTypes = {
        "Totalmente Satisfecho": "verySatisfactory",
        "Satisfecho": "satisfactory",
        "Neutral": "neutral",
        "Insatisfecho": "dissatisfactory",
        "Totalmente Insatisfecho": "veryDissatisfactory"
    };

    // Recorremos los datos
    encuestas.forEach(entry => {
        const agent = entry.Extension;
        
        // Inicializamos el contador para el agente si no existe
        if (!responseCounts[agent]) {
            responseCounts[agent] = {
                satisfactory: 0,
                verySatisfactory: 0,
                neutral: 0,
                dissatisfactory: 0,
                veryDissatisfactory: 0
            };
        }

        // Contamos las respuestas para cada pregunta
        for (let i = 1; i <= 5; i++) {
            const responseText = entry[`TextoRespuesta${i}`];
            if (responseTypes[responseText]) {
                responseCounts[agent][responseTypes[responseText]] += 1;
            }
        }
    });

    // Transformamos el objeto en una lista de objetos con el formato requerido
    const transformedData = Object.keys(responseCounts).map(agent => ({
        agent: `Agente ${agent}`,
        ...responseCounts[agent]
    }));

    return transformedData;
};
