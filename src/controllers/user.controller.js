
const user = require('../models/users')
const mongoose = require('mongoose'); // import mongoo
const bcrypt = require('bcrypt');



//created user
exports.createUser = async (req, res) => {
        Image = 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
        try {
            const {Email, Password, Nom, Prenom, Telephone, Image } = req.body
            //= await user.create(req.body)
            if(!Email || !Password) 
                return res.status(400).json(
            {   error: 'Email and Password required',
                code: 'EMAIL_AND_PASSWORD_REQUIRED'
            })
    
            //verifie si l'email existe déjà
            const existUser = await user.findOne({Email: Email})
            if(existUser){
                
                return res.status(409).json({
                    error: "email exists in database ",
                    code : 'USER_ALREADY_EXISTS'
                })
            } 
            
            // hacher le mot de passe
            const hashedPassword = await bcrypt.hash(Password, 10)
            //new user with hacher password
            const newUser = await user.create({Email, Password: hashedPassword,Nom, Prenom, Telephone, Image })
    
            //retrieve without password
            const result = newUser.toObject()
            delete result.Password
            res.status(201).json(result)
            
        } catch (error) {
            //res.status(400).json({error: error.message})

            res.status(400).json({
                    error: error.message,
                    code : 'SERVER_NOT_FOUND'
                })
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

// login
exports.login = async (req, res) => {
    console.log('REQ BODY:', req.body);
  try {
    // 🔹 Sécurisé : logger uniquement req.body
    console.log('REQ BODY:', req.body);

    // 1. Extract body
    const { Email, Password } = req.body || {};

    // 2. Validate input
    if (!Email || !Password) {
      console.log('Validation échouée : Email ou Password manquant');
      return res.status(400).json({
        error: 'Email and Password required',
        code: 'EMAIL_AND_PASSWORD_REQUIRED'
      });
    }

    // 3. Check if user exists
    const userExist = await user.findOne({ Email });
    if (!userExist) {
      return res.status(401).json({
        code: 'USER_NOT_FOUND',
        error: 'email ou le mot de passe incorrect'
      });
    }

    // 4. Compare password
    const isPasswordValid = await bcrypt.compare(Password, userExist.Password);
    if (!isPasswordValid) {
      return res.status(401).json({
        code: 'INVALID_PASSWORD',
        error: 'email ou le mot de passe incorrect'
      });
    }

    // 5. Remove password from response
    const result = userExist.toObject();
    delete result.Password;

    // 6. Success
    console.log('Login réussi pour:', Email);
    return res.status(200).json(result);

  } catch (error) {
    console.error('Erreur serveur login:', error);
    return res.status(500).json({
      error: error.message,
      code: 'SERVER_ERROR'
    });
  }
};