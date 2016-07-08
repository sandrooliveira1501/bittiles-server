var express = require('express');
var Musica = require('../../models/modelMusica');
var router = express.Router();

router.post('/ranking',function(req,res,next){

  if(!req.body.usuarios || !req.body.musica){
      return res.sendStatus(400);
  }

  Musica.ranking(req.body.usuarios, req.body.musica, function(err, ranking){

    if(err){
      return res.sendStatus(500);
    }

    return res.json(ranking);

  });

});

router.post('/',function(req,res,next){

  if(!req.body.musica){
      return res.sendStatus(400);
  }

  var musica = new Musica(req.body.musica);

  musica.save(function(err, musicaSaved){

    if(err){
      return res.sendStatus(500);
    }

    return res.json(musicaSaved);

  });

});

module.exports = router;
