import express from "express";
import dotenv, { parse } from "dotenv";
import { initDB, sql } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import transactionsRoute from "./routes/transactionsRoute.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(rateLimiter);

const port = process.env.PORT;

app.use("/api/transactions", transactionsRoute);

initDB()
  .catch((err) => {
    console.error("Database init failed, continuing without DB:", err);
  })
  .finally(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  });
