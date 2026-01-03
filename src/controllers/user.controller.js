
const user = require('../models/users')
const mongoose = require('mongoose'); // import mongoo
const bcrypt = require('bcrypt');

// CREATE
// exports.createUser = async (req, res) => {
//   try {
//     const user = await User.create(req.body);
//     res.status(201).json(user);
//   } catch (error) {
//     res.status(400).json({ msg: error.message });
//   }
// };

//created user
exports.createUser = async (req, res) => {
        try {
            const {Email, Password, Nom, Prenom, Telephone, Image } = req.body
            //= await user.create(req.body)
            if(!Email || !Password) return res.status(400).json({error: 'Email and Password required'})
    
            //verifie si l'email existe déjà
            const existUser = await user.findOne({Email: Email})
            if(existUser) return res.status(401).json({error: 'user existe déjà'})
            
            // hacher le mot de passe
            const hashedPassword = await bcrypt.hash(Password, 10)
            //new user with hacher password
            const newUser = await user.create({Email, Password: hashedPassword,Nom, Prenom, Telephone, Image })
    
            //retrieve without password
            const result = newUser.toObject()
            delete result.Password
            res.status(201).json(result)
            
        } catch (error) {
            res.status(400).json({error: error.message})
        }
}

//test db
exports.db = async (req, res) => {
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
}

//get users
exports.getUsers = async (req, res) => {
    
        
        try {
            const users = await user.find();
            res.json(users);//renvoie la liste des produits
        }
        catch (err){
            res.status(500).json({ message: err.message, reponse: res });
        }
    
}