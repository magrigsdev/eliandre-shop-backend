
const mongoose = require('mongoose');
//connection à la base de donnée
const connectDB = async () => {
    try{
        await mongoose.connect('mongodb://localhost:27017/eliandreShop');
        // await mongoose.connect('mongodb://localhost:27017/local');
    console.log(' connecté à MongoDB') // message de success
    }
    catch(err) {
        console.error('Erreur MongoDB',err)
    }
    
}
module.exports = connectDB; // export de l fonction