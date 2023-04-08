import mongoose from "mongoose";
import Blog from "../schemas/Blog.schema";
import User from "../schemas/User.schema";
import blogValidation from "../validators/blog.validator";

class BlogRepository {
  // eslint-disable-next-line class-methods-use-this
  async getBlogs(req, res) {
    let myBlogs;
    try {
      myBlogs = await Blog.find();
    } catch (err) {
      return console.log(err);
    }
    if (!myBlogs) {
      return res.status(404).json({ message: "Can not find blog" });
    }
    return myBlogs;
  }

  // eslint-disable-next-line class-methods-use-this
  async addBlog(req, res) {
    console.log(req);
    const { error, value } = blogValidation.validate(req.body, { abortEarly: false });
    if (error) {
      console.log(error);
      return res.send(error.details);
    }
    const { title, description, writer } = value;
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
      console.log(err);
      return res.status(500).json({ message: err });
    }

    return blog;
  }

  // eslint-disable-next-line class-methods-use-this
  async updateBlog(req, res) {
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
    return blog;
  }

  // eslint-disable-next-line class-methods-use-this
  async deleteBlog(req) {
    const { id } = req.params;

    let blog;
    try {
      blog = await Blog.findByIdAndRemove(id).populate("blog");
      await blog.user.blogs.pull(blog);
      await blog.user.save();
    } catch (e) {
      console.log(e);
    }
    return blog;
  }

  // eslint-disable-next-line class-methods-use-this
  async getByUserId(req) {
    const userId = req.params.id;
    let userBlogs;
    try {
      userBlogs = await User.findById(userId).populate("blogs");
    } catch (e) {
      return console.log(e);
    }
    return userBlogs;
  }
}

const blogRepository = new BlogRepository();

export default blogRepository;