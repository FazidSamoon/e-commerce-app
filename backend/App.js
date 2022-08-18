//packages
import Express from "express";
import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import cors from "cors";

//importing files
import connectDB from "./database/connect.js";
import router from "./routes/index.routes.js";
import { errorHandlerMiddleware } from "./middleware/error-handler-middleware.js";

//configuring packages

const app = Express();
const port = process.env.PORT_NUMBER || 5000;

//midleware
app.use(Express.json());
app.use(cors());
app.use(errorHandlerMiddleware);

//routes
app.use("/api/v1", router);

try {
  connectDB();
  app.listen(port, () => {
    console.log(`Backend app is running on port ${port}`);
  });
} catch (error) {}
