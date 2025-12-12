
const express = require('express'); //appel le framework
const router = express.Router(); // recupère les routes du frameworks
const user = require('../models/users'); //recupère le model
const bcrypt = require('bcrypt'); //hacher password

//get:
router.get('/', async (req, res) => {
    
    try {
        const users = await user.find();
        res.json(users);//renvoie la liste des produits
    }
    catch (err){
        res.status(500).json({ message: err.message, reponse: res });
    }
});

//post: creation new user  
router.post('/', async (req, res) =>{
    try {
        const {Email, Password, ...otherData } = req.body
        //= await user.create(req.body)
        if(!Email || !Password) return res.status(400).json({error: 'Email and Password required'})
        
        // hacher le mot de passe
        const hashedPassword = await bcrypt.hash(Password, 10)
        //new user with hacher password
        const newUser = await user.create({Email, Password: hashedPassword,...otherData})

        //retrieve without password
        const result = newUser.toObject()
        delete result.Password
        res.status(201).json(result)
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

//post check email and password
router.post('/login', async (req, res) =>{
    try {
        const {Email , Password} = req.body
        //email or password undefined
        if(!Email || !Password){
            return res.status(400).json({error: 'Email and Password required'})
        }
        //email or password not found
        const found = await findOne({Email: Email})
        if(!found) return res.status(401).json({error: 'Email or Password is invalid'})
        
        //simple comparason with hacher password
        const passwordMatch = await bcrypt.compare(Password, found.Password);

        if(!passwordMatch) return res.status(401).json({error: 'Email or Password is invalid'})

        //clean password before retrieve
        const safeUser = found.toObject()
        delete safeUser.Password

        //retrieve
        res.json({message: 'Authentification successfull', user: safeUser})


    } catch (error) {
        res.status(500).json({error: error.message})
    }
})


module.exports = router;

