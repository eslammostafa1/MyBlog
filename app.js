import express from "express";
import mongoose from "mongoose";
import blogRouter from "./routes/blog.routes";
import userRouter from "./routes/user.routes";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/blog", blogRouter);

mongoose.connect(
    'mongodb+srv://admin:12345@cluster0.j8jahyb.mongodb.net/Blogdb?retryWrites=true&w=majority'
)
.then(()=>app.listen(3000))
.then(()=>
  console.log('Connected on database on port 3000')
)
.catch((error)=>console.log(error))

