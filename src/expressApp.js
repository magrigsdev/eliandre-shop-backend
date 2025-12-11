const express = require('express'); // import express : frameword server
const cors = require('cors'); //definir les droits
const ProduitRoutes = require('./routes/Produits.js')// definition de route 
const SacsRoutes = require('./routes/Sacs.js')// definition de route 
 

const app = express(); //appelle le framework
app.use(cors()); // utilise les droits
app.use(express.json()); // utilse le format de fichier à fretourné .json

app.use('/api/produits', ProduitRoutes);
app.use('/api/Sacs', SacsRoutes);


module.exports = app