
const app = require('./expressApp');
const connectDB = require('./db');
 
connectDB();
 
app.listen(3000, () => {
  console.log('🚀 Serveur démarré sur le port 3000 ..., http://localhost:3000/api/');
  
});