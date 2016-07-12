var express = require('express');
var Musica = require('../../models/modelMusica');
var _ = require('lodash');
var router = express.Router();


router.post('/',function(req,res,next){

  if(!req.body.musica){
      return res.sendStatus(400);
  }

  var musica = new Musica(req.body.musica);
  var query = {idFacebook:musica.idFacebook, fileName: musica.fileName};

  Musica.find(query, function(err, musicas){
    if(err){
      return next(err);
    }

    var musicaSaved;
    if(musicas && musicas.length > 0){
      musicaSaved = musicas[0];
      if(musica.score > musicaSaved.score){
        musicaSaved.score = musica.score;
      }
    }else{
      musicaSaved = musica;
    }

    musicaSaved.save(function(err, response){

      if(err){
        return next(err);
      }

      return res.json(response);

    });

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
