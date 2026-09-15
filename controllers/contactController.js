const { getCollection, ObjectId } = require('../db/database');

async function getAllContacts(req, res) {
  try {
    const professionals = await getCollection();
    const contacts = await professionals.find({}).toArray();

    return res.status(200).json(contacts);
  } catch (error) {
    console.error('Failed to fetch all contacts:', error);
    return res.status(500).json({ error: 'Failed to fetch contacts' });
  }
}

async function getContactById(req, res) {
  try {
    const { id } = req.params;
    const professionals = await getCollection();

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid contact ID' });
    }

    const contact = await professionals.findOne({ _id: new ObjectId(id) });

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    return res.status(200).json(contact);
  } catch (error) {
    console.error('Failed to fetch contact by id:', error);
    return res.status(500).json({ error: 'Failed to fetch contact' });
  }
}

async function getProfessional(req, res) {
  try {
    const professionals = await getCollection();
    const professional = await professionals.findOne({}, { projection: { _id: 0 } });

    if (!professional) {
      return res.status(404).json({ error: 'Professional data not found' });
    }

    return res.status(200).json(professional);
  } catch (error) {
    console.error('Database query failed:', error);
    return res.status(500).json({ error: 'Database query failed' });
  }
}

module.exports = {
  getAllContacts,
  getContactById,
  getProfessional,
};
