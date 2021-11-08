import express from "express";
import logger from "./utils/logger.js";
import cors from "cors";
import dotenv from "dotenv";
import connect from "./utils/connect.js";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/user.js";
import healthCheckRoutes from "./routes/healthcheck.js";

dotenv.config();

const app = express();

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));
app.use(cors());

app.use("/", postRoutes, userRoutes, healthCheckRoutes);

app.listen(process.env.PORT || 1337, async () => {
  logger.info(`Server running on port: ${process.env.PORT}`);

  await connect();
});
