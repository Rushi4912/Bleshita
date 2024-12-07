import mongoose from 'mongoose';

const dbConnect = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/bleshita `);
    console.log('Connected to MongoDB:', mongoose.connection.name); 
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

export default dbConnect;
