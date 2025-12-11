
const express = require('express'); //appel le framework
const router = express.Router(); // recupère les routes du frameworks
const listProduit = require('../models/produit'); //recupère le model

//get:
router.get('/', async (req, res) => {
    try {
        const produits = await listProduit.find();
        res.json(produits);//renvoie la liste des produits
    }
    catch (err){
        res.status(500).json({ message: err.message });
    }
});
module.exports = router;

