const conexion = require("../conexion");

class encuestaDao{

    constructor(){}

    findAll(){

        return conexion.query('Select * from Respuestas');
    }
}



module.exports = encuestaDao