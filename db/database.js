const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const mongoUri = process.env.MONGODB_URI;
const databaseName = process.env.MONGODB_DB || 'professionalDB';
const defaultCollectionName = 'professionals';

const client = new MongoClient(mongoUri);

async function getCollection(collectionName = defaultCollectionName) {
  if (!mongoUri) {
    throw new Error('MONGODB_URI is not defined in the environment variables.');
  }

  if (!client.topology || !client.topology.isConnected()) {
    await client.connect();
  }

  const database = client.db(databaseName);
  return database.collection(collectionName);
}

module.exports = {
  getCollection,
  ObjectId,
};
