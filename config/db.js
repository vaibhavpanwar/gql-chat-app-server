import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_CONNECTION, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    console.log(`MongoDB Connected:`);
  } catch (error) {
    console.error(`Error connecting mongoDb ${error}`);
    process.exit(1);
  }
};

export default connectDB;
