
const express = require('express'); //appel le framework
const router = express.Router(); // recupère les routes du frameworks
const user = require('../models/users'); //recupère le model


//get:
router.get('/', async (req, res) => {
    
    try {
        const users = await user.find();
        res.json(users);//renvoie la liste des produits
    }
    catch (err){
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;

