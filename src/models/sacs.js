const mongoose = require('mongoose');

//le models
const SacsSchema = new mongoose.Schema({
  libelle: String,
  image: String,
  prix: Number,
  description: String,
});
 
module.exports = mongoose.model('sacs', SacsSchema, 'Sacs' );