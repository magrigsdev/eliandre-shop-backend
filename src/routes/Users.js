
const express = require('express'); //appel le framework
const router = express.Router(); // recupère les routes du frameworks
const listUsers = require('../models/users'); //recupère le model

//get:
router.get('/', async (req, res) => {
    console.log("test users ...")
    try {
        const users = await listUsers.find();
        res.json(users);//renvoie la liste des produits
    }
    catch (err){
        res.status(500).json({ message: err.message, reponse: res });
    }
});
module.exports = router;

