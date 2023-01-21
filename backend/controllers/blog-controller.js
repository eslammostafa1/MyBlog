import mongoose from "mongoose";
import Blog from "../model/Blog";
import User from "../model/User";

export const getBlogs = async (req, res) => {
  let myBlogs;
  try {
    myBlogs = await Blog.find().populate("user");
  } catch (err) {
    return console.log(err);
  }
  if (!myBlogs) {
    return res.status(404).json({ message: "Can not find blog" });
  }
  return res.status(200).json({ myBlogs });
};

export const addBlog = async (req, res) => {
  const { title, description, image, user } = req.body;

  let myUser;
  try {
    myUser = await User.findById(user);
  } catch (e) {
    return console.log(e);
  }
  if (!myUser) {
    return res.status(400).json({ message: "User not found" });
  }
  const blog = new Blog({
    title,
    description,
    image,
    user,
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

export const getById = async (req, res, next) => {
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

export const deleteBlog = async (req, res, next) => {
  const id = req.params.id;

  let blog;
  try {
    blog = await Blog.findByIdAndRemove(id).populate("user");
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

export const getByUserId = async (req, res, next) => {
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
