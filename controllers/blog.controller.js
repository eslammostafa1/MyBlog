import mongoose from "mongoose";
import Blog from "../schemas/Blog.schema";
import User from "../schemas/User.schema";

export const getBlogs = async (req, res) => {
  let myBlogs;
  try {
    myBlogs = await Blog.find();
  } catch (err) {
    return console.log(err);
  }
  if (!myBlogs) {
    return res.status(404).json({ message: "Can not find blog" });
  }
  return res.status(200).json({ myBlogs });
};

export const addBlog = async (req, res) => {
  const { title, description, writer } = req.body;

  let myUser;
  try {
    myUser = await User.findById(writer);
  } catch (e) {
    return console.log(e);
  }
  if (!myUser) {
    return res.status(400).json({ message: "User not found" });
  }
  const blog = new Blog({
    title,
    description,
    writer,
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({ session });
    myUser.blogs.push(blog);
    await myUser.save({ session });
    await session.commitTransaction();
  } catch (err) {
    console.log(e);
    return res.status(500).json({ message: e });
  }

  return res.status(200).json({ blog });
};

export const updateBlog = async (req, res) => {
  const { title, description } = req.body;
  const blogId = req.params.id;
  let blog;

  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      description,
    });
  } catch (e) {
    return console.log(e);
  }
  if (!blog) {
    return res.status(500).json({ message: "Unable To Update The Blog" });
  }
  return res.status(200).json({ blog });
};

export const getBlogById = async (req, res) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blog.findById(id);
  } catch (e) {
    return console.log(e);
  }
  if (!blog) {
    return res.status(404).json({ message: "No Blog Found" });
  }
  return res.status(200).json({ blog });
};

export const deleteBlog = async (req, res) => {
  const id = req.params.id;

  let blog;
  try {
    blog = await Blog.findByIdAndRemove(id).populate("blog");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
  } catch (e) {
    console.log(e);
  }
  if (!blog) {
    return res.status(500).json({ message: "Unable To Delete" });
  }
  return res.status(200).json({ message: "Successfully Delete" });
};

export const getByUserId = async (req, res) => {
  const userId = req.params.id;
  let userBlogs;
  try {
    userBlogs = await User.findById(userId).populate("blogs");
  } catch (e) {
    return console.log(e);
  }
  if (!userBlogs) {
    return res.status(404).json({ message: "Can not find blogs" });
  }
  return res.status(200).json({ user: userBlogs });
};
