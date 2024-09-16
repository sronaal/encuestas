
const fs = require("fs")
const https = require("https")
const path = require("path")
const app = require("./app")

const PORT = 8081

const sslOptions = {
    key: fs.readFileSync(path.join(__dirname, 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert.pem'))
  };
  
  // Configura el servidor HTTPS
  https.createServer(sslOptions, app).listen(PORT, () => {
    console.log(`Servidor HTTPS corriendo en el puerto ${PORT}`);
  });