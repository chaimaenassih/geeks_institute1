import mongoose from 'mongoose';

export async function connectMongo() {
  if (!process.env.MONGO_URL) {
    throw new Error('MONGO_URL missing'); 
  }
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      dbName: process.env.MONGO_DB || undefined, 
    });
    console.log('[db] connected to', conn.connection.host.includes('mongodb.net') ? 'MongoDB Atlas' : conn.connection.host);
  } catch (err) {
    console.error('[db] connect error:', err.message);
    throw err;
  }
}
