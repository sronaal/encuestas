const url = "https://200.91.192.58:3000/encuestas"

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