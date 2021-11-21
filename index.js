import express from "express";
import logger from "./utils/logger.js";
import responseTime from "response-time";
import cors from "cors";
import dotenv from "dotenv";
import connect from "./utils/connect.js";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/user.js";
import healthCheckRoutes from "./routes/healthcheck.js";
import { startMetricsServer } from "./utils/metrics.js";
import { restResponseTimeHistogram } from "./utils/metrics.js";

dotenv.config();

export const app = express();

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));
app.use(cors());

app.use(
  responseTime((req, res, time) => {
    if (req?.route?.path) {
      restResponseTimeHistogram.observe(
        {
          method: req.method,
          route: req.route.path,
          status_code: res.statusCode,
        },
        time * 1000
      );
    }
  })
);

app.use("/", postRoutes, userRoutes, healthCheckRoutes);

app.listen(process.env.PORT || 1337, async () => {
  logger.info(`Server running on port: ${process.env.PORT}`);

  await connect();

  startMetricsServer();
});
