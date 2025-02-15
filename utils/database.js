import mongoose from "mongoose";

let isConnected = false;

// Next uses lambda functions for api calls, which means we will need to reconnect to the database each time we make a reques
export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("using existing connection");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "promptastic_db",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;

    console.log("MongoDB connected");
  } catch (error) {
    console.log("error connecting to database", error);
  }
};
