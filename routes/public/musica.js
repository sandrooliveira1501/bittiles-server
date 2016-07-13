var express = require('express');
var Musica = require('../../models/modelMusica');
var router = express.Router();

router.post('/ranking',function(req,res,next){

  if(!req.body.usuarios || !req.body.musica){
      return res.sendStatus(400);
  }

  Musica.ranking(req.body.usuarios, req.body.musica, function(err, ranking){

    if(err){
      return next(err);
    }

    return res.json({"lista":ranking});

  });

});

module.exports = router;
