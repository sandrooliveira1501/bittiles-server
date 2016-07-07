var express = require('express');
var Usuario = require('../../models/modelUsuario');
var router = express.Router();

router.post('/',function(req,res,next){

  if(!req.body.usuario){
    res.sendStatus(400);
  }

  Usuario.find({idFacebook:req.body.usuario.idFacebook}, function(err, usuarios){

    if(err){
      return next(err);
    }
    if(usuarios.length === 0){

      var usuario = new Usuario(req.body.usuario);

      usuario.save(function(err, usuario){

        if(err){
          return res.sendStatus(500);
        }

        return res.json(usuario);

      });

    }else{

      return res.json(usuarios[0]);

    }
  })

});

module.exports = router;
