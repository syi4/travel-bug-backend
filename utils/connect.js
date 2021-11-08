import mongoose from "mongoose";
import logger from "./logger.js";

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    logger.info("DB connected");
  } catch (error) {
    logger.error("Error connecting to DB");
    process.exit(1);
  }
};

export default connect;
