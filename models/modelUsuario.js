// grab the things we need
var mongoose = require('../db.js');
var config = require('../config')
var Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

var constants = {
  MODEL_NAME: 'Usuario',
  COLLECTION_NAME: 'usuarios'
};

//DEPOIS ADICIONAR SE é required unique, etc
// create a schema
var schema = Schema({
  idFacebook :{type: String, required: true, unique: true},
  nome : {type: String, required : true},
  nivel : {type: Number, default: 0}
}, {collection: constants.COLLECTION_NAME});

schema.statics.ranking = function(usuarios, cb){

  var query = {idFacebook: {$in:usuarios}};
  var sort = {nivel:-1};

  this.find(query).sort(sort).exec(cb);

};

var Usuario = mongoose.model(constants.MODEL_NAME, schema);
Usuario.constants = constants;

module.exports = Usuario;
