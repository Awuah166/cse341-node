const { MongoClient } = require('mongodb');
const fs = require('fs');
require('dotenv').config();

const mongoUri = process.env.MONGODB_URI;
const databaseName = process.env.MONGODB_DB || 'test';

if (!mongoUri) {
  throw new Error('MONGODB_URI is required in .env');
}

const professional = {
  professionalName: 'Awuah Dennis',
  base64Image: '',
  nameLink: {
    firstName: 'Awuah',
    url: 'https://www.linkedin.com/in/awuah-dennis-210bb8338'
  },
  primaryDescription: 'I am a passionate software developer with a strong interest in web development.',
  workDescription1: 'I build modern websites and web applications.',
  workDescription2: 'I enjoy working with JavaScript, React and Node.js to create dynamic and responsive user interfaces.',
  linkTitleText: 'Connect with me on LinkedIn and GitHub:',
  linkedInLink: {
    text: 'LinkedIn',
    link: 'https://www.linkedin.com/in/awuah-dennis-210bb8338'
  },
  githubLink: {
    text: 'GitHub',
    link: 'https://github.com/Awuah166'
  }
};

const serverSource = fs.readFileSync('./server.js', 'utf8');
const imageMatch = serverSource.match(/base64Image:\s*'([^']+)'/);
professional.base64Image = imageMatch ? imageMatch[1] : '';

async function seed() {
  const client = new MongoClient(mongoUri);

  try {
    await client.connect();
    const collection = client.db(databaseName).collection('professionals');
    await collection.replaceOne(
      { professionalName: professional.professionalName },
      professional,
      { upsert: true }
    );
    console.log(`Seeded ${databaseName}.professionals`);
  } finally {
    await client.close();
  }
}

seed().catch((error) => {
  console.error('Failed to seed MongoDB:', error.message);
  process.exitCode = 1;
});
