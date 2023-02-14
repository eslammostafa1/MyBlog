import express from "express";
import {
  addBlog,
  deleteBlog,
  getBlogs,
  getBlogById,
  getByUserId,
  updateBlog,
} from "../controllers/blog.controller";
const blogRouter = express.Router();

blogRouter.get("/", getBlogs);
blogRouter.post("/add", addBlog);
blogRouter.put("/update/:id", updateBlog);
blogRouter.get("/:id", getBlogById);
blogRouter.delete("/:id", deleteBlog);
blogRouter.get("/user/:id", getByUserId);

export default blogRouter;
