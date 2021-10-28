import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/user.js";
import healthCheckRoutes from "./routes/healthcheck.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB successfully connected"))
  .catch((error) => console.log(error.message));
const app = express();

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));
app.use(cors());

app.use("/", postRoutes, userRoutes, healthCheckRoutes);

app.listen(process.env.PORT || 1337, () => {
  console.log(`Server running on port: ${process.env.PORT}`);
});
