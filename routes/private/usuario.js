var express = require('express');
var Usuario = require('../../models/modelUsuario');
var _ = require('lodash');
var router = express.Router();

router.post('/',function(req,res,next){

  if(!req.body.usuario){
    return res.sendStatus(400);
  }

  Usuario.find({idFacebook:req.body.usuario.idFacebook}, function(err, usuarios){

    if(err){
      return next(err);
    }

    if(usuarios.length === 0){
      return res.sendStatus(204);
    }

    var usuario = usuarios[0];

    usuario = _.extend(usuario, req.body.usuario);

    usuario.save(function(err, usuarioUpdated){

      if(err){
        return next(err);
      }

      return res.json(usuarioUpdated);
    });

  });

  //evento = _.extend(evento, req.body.evento)

});

module.exports = router;
