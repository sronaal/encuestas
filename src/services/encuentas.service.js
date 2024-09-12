const conexion = require("../conexion");

class encuestaDao{

    constructor(){}

    findAll(){

        return conexion.query('SELECT * FROM RespuestasVista;');
    }
}



module.exports = encuestaDao