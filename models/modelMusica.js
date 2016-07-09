// grab the things we need
var mongoose = require('../db.js');
var config = require('../config')
var Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

var constants = {
  MODEL_NAME: 'Musica',
  COLLECTION_NAME: 'musicas'
};

//DEPOIS ADICIONAR SE é required unique, etc
// create a schema
var schema = Schema({
  fileName: {type : String, required: true, unique: true},
  dificuldade: {type: Number, required: true},
  nome: { type: String, required:true},
  score: {type:Number, required:true},
  idFacebook: {type: Number, required:true}
}, {collection: constants.COLLECTION_NAME});

schema.statics.ranking = function(usuarios, musica, cb){

  var query = {idFacebook: {$in:usuarios}, fileName: musica.fileName, dificuldade: musica.dificuldade};
  var sort = {score:-1};

  this.aggregate([
    {$match: query},
    {$lookup: {
              from: "usuarios",
              localField: "idFacebook",
              foreignField : "idFacebook",
              as: "usuario"
            }
    },
    {$unwind: "$usuario"},
    {$sort: sort}

  ]).exec(cb);

  //this.find(query).sort(sort).exec(cb);

};

var Musica = mongoose.model(constants.MODEL_NAME, schema);
Musica.constants = constants;

module.exports = Musica;
