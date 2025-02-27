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
    const dbUri =
      process.env.NODE_ENV === "production"
        ? process.env.MONGO_URI_PRODUCTION
        : process.env.MONGO_URI_LOCAL;

    const dbName =
      process.env.NODE_ENV === "production"
        ? "promptastic_db"
        : "promptastic_dev";

    console.log(`Connecting to MongoDB: ${dbUri} (DB: ${dbName})`);

    await mongoose.connect(dbUri, { dbName });

    isConnected = true;

    console.log("MongoDB connected");
  } catch (error) {
    console.log("error connecting to database", error);
  }
};
