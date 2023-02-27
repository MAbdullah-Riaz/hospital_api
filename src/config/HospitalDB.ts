import mongoose from 'mongoose';
export const connectDb = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect('mongodb://localhost/hospital_api');
  console.log('Db Connected');
};
