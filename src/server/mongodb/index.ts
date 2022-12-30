import mongoose from 'mongoose';

export const connect = async () => {
  mongoose.set('strictQuery', true);
  const uri = process.env.MONGO_URI ?? 'mongodb://root:password@localhost';
  const dbName = process.env.MONGO_DB ?? 'database';
  await mongoose.connect(uri, { dbName });
};
