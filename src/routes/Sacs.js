const express = require('express'); //appel le framework
const router = express.Router(); // recupère les routes du frameworks
const listSacs = require('../models/sacs'); //recupère le model

//get:
router.get('/', async (req, res) => {
    console.log("get sacs loading ...")
    try {
        console.log("get sacs aalomost ready ...")
        const sacs = await listSacs.find();
        res.json(sacs);//renvoie la liste des produits
    }
    catch (err){
        res.status(500).json({ message: err.message });
    }
});
module.exports = router;

