
const fs = require("fs")
const https = require("https")
const app = require("./app")

const PORT = 8081

https.createServer({
    
    cert: fs.readFileSync(''),
    key: fs.readFileSync('')}, 
    app.listen(PORT, (error) => {

        if(error) {
            console.log(error)
            throw error
        }

        console.log(`Servidor HTTPS Ejecutandose en puerto: ${PORT}`)
    })
)

app.listen(8081, () => {

    console.log(`SERVIDOR HTTP ON`)
})