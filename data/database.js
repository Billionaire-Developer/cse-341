const dotenv = require('dotenv');
dotenv.config();

const { MongoClient } = require('mongodb');

let database;

const initDb = async (callback) => {
  if (database) {
    console.log("Database is already initialized");
    return callback(null, database);
  }

  try {
    const client = new MongoClient(process.env.MONGODB_URL, {
      tls: true,
      tlsAllowInvalidCertificates: true, // important for Node 22
      serverSelectionTimeoutMS: 10000,
    });

    await client.connect();
    database = client.db();
    console.log("✅ Connected to MongoDB Atlas successfully!");
    callback(null, database);
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    callback(err);
  }
};

const getDatabase = () => {
  if (!database) throw Error("Database not initialized");
  return database;
};

module.exports = { initDb, getDatabase };
