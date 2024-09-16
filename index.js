
const fs = require("fs")
const https = require("https")
const path = require("path")
const {app,app2} = require("./app")

const PORT = 8081

const sslOptions = {
<<<<<<< HEAD
    key: fs.readFileSync(path.join(__dirname, 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert.pem'))
  };
  
  // Configura el servidor HTTPS
  https.createServer(sslOptions, app).listen(PORT, () => {
    console.log(`Servidor HTTPS corriendo en el puerto ${PORT}`);
  });

app2.listen(3000,() => {

  console.log("SERVER 3000 ON")
})
=======
    key: fs.readFileSync(path.join(__dirname, '200.91.192.58-key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '200.91.192.58.pem'))
  };
  
  // Configura el servidor HTTPS
https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`Servidor HTTPS corriendo en el puerto ${PORT}`);
});

https.createServer(sslOptions, app2).listen(3000, () => {
  console.log(`Servidor HTTPS corriendo en el puerto ${3000}`);
});



>>>>>>> 2452e26 (Cambios)
