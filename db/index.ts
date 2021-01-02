import Mongoose from 'mongoose';

const DB_PORT = 27017;

export async function connectDB() {
  const dbUrl = `mongodb://workouts-db:${DB_PORT}`;
  try {
    console.log(`Attempting to connect to Database on port ${DB_PORT}`);
    await Mongoose.connect(dbUrl, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: true });
  } catch (err) {
    console.log('Database connection failed!');
  }
}
