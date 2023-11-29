import mongoose from "mongoose";

export const connect = async (): Promise<void> => {
  const mongoUrl = process.env.MONGO_URL;

  if (!mongoUrl) {
    console.error("MONGO_URL is not defined in the environment variables.");
    process.exit(1); // Thoát với mã lỗi 1
  }

  try {
    await mongoose.connect(mongoUrl);
    console.log("Connect Success!");
  } catch (error) {
    console.log("Connect Error!");
  }
};
