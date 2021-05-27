import { Db, MongoClient } from 'mongodb';

declare global {
  namespace NodeJS {
    interface Global {
      mongo: any;
    }
  }
}

global.mongo = global.mongo || {};

export const connectToDB = async () => {
  if (!global.mongo.client) {
    global.mongo.client = new MongoClient(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferMaxEntries: 0,
      connectTimeoutMS: 10000,
    });

    await global.mongo.client.connect();
  }

  const db: Db = global.mongo.client.db('ReadNCode');

  return { db, dbClient: global.mongo.client };
};
