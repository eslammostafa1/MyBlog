import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import blogRouter from "./routes/blog.routes";
import userRouter from "./routes/user.routes";

const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();

app.use("/user", userRouter);
app.use("/blog", blogRouter);

mongoose.connect(
  `mongodb+srv://admin:${process.env.DB_PASS}@cluster0.j8jahyb.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
)
  .then(() => app.listen(process.env.PORT || 3000))
  .then(() => console.log(`Connected on database on port ${process.env.PORT}`))
  .catch((error) => console.log(error));
