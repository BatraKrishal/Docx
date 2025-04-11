// filepath: c:\Users\Dell\Desktop\WebDev\Docs - Clone\Docx-Clone\Server\Models\Document.js
const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Document', DocumentSchema);