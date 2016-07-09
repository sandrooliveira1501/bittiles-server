var express = require('express');
var Musica = require('../../models/modelMusica');
var _ = require('lodash');
var router = express.Router();


router.post('/',function(req,res,next){

  if(!req.body.musica){
      return res.sendStatus(400);
  }

  var musica = new Musica(req.body.musica);

  musica.save(function(err, musicaSaved){

    if(err){
      return next(err);
    }

    return res.json(musicaSaved);

  });

});


router.put('/',function(req,res,next){
  if(!req.body.musica){
    return res.sendStatus(400);
  }

  Musica.findById(req.body.musica._id, function(err, musica){

    if(err){
      return next(err);
    }

    musica = _.extend(musica, req.body.musica);

    musica.save(function(err, musicaUpdated){

      if(err){
        return next(err);
      }

      return res.json(musicaUpdated);

    });

  });

});

module.exports = router;
