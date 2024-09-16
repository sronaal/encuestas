const url = "https://200.91.192.58:8081/encuestas"

export function obtenerEncuentas (){

    return new Promise((resolve,reject) => {

        fetch(url)
        .then((data) => {
            return data.json()
        })
        .then((data) => {
            return resolve(data)
        })
        .catch((error) => {

            return reject(error)
        })
    })

}