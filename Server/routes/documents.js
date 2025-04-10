const express = require('express');
const router = express.Router();
const Document = require('../models/Document');

// Create a new document
router.post('/', async (req, res) => {
  try {
    const document = new Document({
      title: req.body.title || 'Untitled Document',
      content: req.body.content || ''
    });
    await document.save();
    res.status(201).json(document);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all documents
router.get('/', async (req, res) => {
  try {
    const documents = await Document.find().sort({ updatedAt: -1 });
    res.json(documents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single document
router.get('/:id', async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) return res.status(404).json({ message: 'Document not found' });
    res.json(document);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a document
router.put('/:id', async (req, res) => {
  try {
    const document = await Document.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        content: req.body.content,
        updatedAt: Date.now()
      },
      { new: true }
    );
    if (!document) return res.status(404).json({ message: 'Document not found' });
    res.json(document);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a document
router.delete('/:id', async (req, res) => {
  try {
    const document = await Document.findByIdAndDelete(req.params.id);
    if (!document) return res.status(404).json({ message: 'Document not found' });
    res.json({ message: 'Document deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;