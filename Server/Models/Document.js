require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
//const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
// app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Database connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
// app.use('/api/documents', require('../routes/document-operations')); // Document operations
// app.use('/api/upload', require('./routes/upload')); // File upload operations

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));