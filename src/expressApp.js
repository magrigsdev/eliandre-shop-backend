const express = require('express'); // import express : frameword server
const cors = require('cors'); //definir les droits
const UsersRoutes = require('./routes/Users.js')// definition de route 
const SacsRoutes = require('./routes/Sacs.js');// definition de route 
const health = require("./routes/health.js")


// definition de route
//const { default: mongoose } = require('mongoose');

//

const app = express(); //appelle le framework
app.use(cors()); // utilise les droits
app.use(express.json()); // utilse le format de fichier à fretourné .json

app.use('/api/users', UsersRoutes);
app.use('/api/sacs', SacsRoutes);
app.use("/api/test-db", health);


module.exports = app