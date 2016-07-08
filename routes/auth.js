var Usuario = require('../models/modelUsuario');
var config = require('../config')

module.exports = function(req,res,next){
    var idFacebook = req.headers[config.authHeader];
    if(idFacebook){

        Usuario.find({idFacebook:idFacebook}, function(err, usuarios){

          if(err || (usuarios.length === 0)){
                req.unauthorized = true;
                res.status(401);
                return res.json(401);
          }

          req.auth = usuarios[0];
          next();
        });

    }else{
        req.unauthorized = true;
        res.status(401);
        return res.json(401);
    }


}
