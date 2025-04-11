require('dotenv').config();                           
const express = require('express');                  
const mongoose = require('mongoose');              
const cors = require('cors');                
const bodyParser = require('body-parser');      

const app = express();                

// Middleware
app.use(cors());                         
app.use(bodyParser.json({ limit: '50mb' }));    
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));   

// Add this after other middleware
app.use('/uploads', express.static('uploads')); 

// Database connection
mongoose.connect(process.env.MONGO_URI)  
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
 app.use("/api", require("./routes/test") ); 
 app.use('/api/documents', require('./routes/document-operations'));  
 app.use('/api/upload', require('./routes/upload'));   

// Add error handling middleware
app.use((err, req, res, next) => {  
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// Start the server
const PORT = process.env.PORT || 5000;  
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); r