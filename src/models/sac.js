
const mongoose = require('mongoose');

//le models
const ProduitSchema = new mongoose.Schema({
  libelle: String,
  image: String,
  prix: Number,
  description: String,
});
 
module.exports = mongoose.model('sacs', ProduitSchema, 'Sacs' );