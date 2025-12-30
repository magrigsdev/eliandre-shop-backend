const express = require('express'); //appel le framework
const router = express.Router(); // recupère les routes du frameworks
const mongoose = require('mongoose'); // import mongoo


router.get('/', (req, res) => {
    const status = mongoose.connection.readyState;
    
    const statusMessages = {
        0: 'Déconnecté',
        1: 'Connecté',
        2: 'En cours de connexion',
        3: 'En cours de déconnexion'
    };
    
    res.json({
        status: status,
        message: statusMessages[status],
        database: mongoose.connection.name || 'Non défini'
    });
});

module.exports = router
