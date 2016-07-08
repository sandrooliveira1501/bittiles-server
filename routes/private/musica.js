var express = require('express');
var Usuario = require('../../models/modelUsuario');
var router = express.Router();

router.post('/',function(req,res,next){
  return res.json("");
});

module.exports = router;
