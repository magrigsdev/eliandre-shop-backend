
const mongoose = require('mongoose');

//le models
const UsersSchema = new mongoose.Schema({
  Nom: String,
  Prenom: String,
  Email:String,
  Telephone: String,
  Password:String,
  Image: String,
});
 
module.exports = mongoose.model('users', UsersSchema, 'Users' );