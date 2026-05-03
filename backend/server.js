import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import todoRoutes from "./routes/todoRoutes.js";
import errorHandler from "./middleware/errorHandler.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(errorHandler);

// DB connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

// Routes
app.use("/api/todos", todoRoutes);

// Server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});