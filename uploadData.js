const { MongoClient } = require('mongodb');
const { nanoid } = require('nanoid');
const books = require('./newData.json');

const connect = async () => {
  const client = new MongoClient(
    'mongodb+srv://Ghulam1user:ghulam1user@cluster0.4mdc1.mongodb.net/ReadNCode?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferMaxEntries: 0,
      connectTimeoutMS: 10000,
    }
  );

  console.log('connecting to DB');
  await client.connect();
  console.log('connected to DB');

  const db = client.db('ReadNCode');

  for (let b in books) {
    books[b]._id = nanoid();
    db.collection('books').insertOne(books[b]);
  }
};

connect();
