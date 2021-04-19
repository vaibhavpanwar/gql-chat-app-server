import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://vaibhav:vaibhav@cluster0.7owr0.mongodb.net/gqlChat?retryWrites=true&w=majority",
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
      }
    );

    console.log(`MongoDB Connected:`);
  } catch (error) {
    console.error(`Error connecting mongoDb ${error}`);
    process.exit(1);
  }
};

export default connectDB;
