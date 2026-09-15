const express = require('express');
const { getCollection, ObjectId } = require('../db/database');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const collection = await getCollection('contacts');
    const contacts = await collection.find({}).toArray();

    return res.status(200).json(contacts);
  } catch (error) {
    console.error('Error fetching all contacts:', error);
    return res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const collection = await getCollection('contacts');

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid contact ID' });
    }

    const contact = await collection.findOne({ _id: new ObjectId(id) });

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    return res.status(200).json(contact);
  } catch (error) {
    console.error('Error fetching contact by id:', error);
    return res.status(500).json({ error: 'Failed to fetch contact' });
  }
});

module.exports = router;
