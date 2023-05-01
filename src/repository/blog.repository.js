import mongoose from "mongoose";
import Blog from "../schemas/Blog.schema";
import User from "../schemas/User.schema";

class BlogRepository {
/**
 * Retrieves all blog objects from a database.
 * @returns {Promise<Array>} An array of all blog objects in the database.
 */
  async getBlogs() {
    let myBlogs;
    try {
      myBlogs = await Blog.find();
    } catch (err) {
      return console.log(err);
    }
    if (!myBlogs) {
      throw new Error("Can not find blog");
    }
    return myBlogs;
  }

  /**
 * Retrieves one blog objects from a database.
 * @param {Object} req - The request object containing the blog ID.
 * @returns {Promise<Array>} An blog object in the database.
 */
  async getBlog(req) {
    const { id } = req.params;
    let myBlog;
    try {
      myBlog = await Blog.findById(id);
    } catch (err) {
      return console.log(err);
    }
    if (!myBlog) {
      throw new Error("Can not find blog");
    }
    return myBlog;
  }

  /**
 * Adds a new blog object to a database.
 * @param {Object} req - The request object containing the title, description, and writer data.
 * @returns {Promise<Object>} A Promise that resolves to the newly created blog object.
 */
  async addBlog(req) {
    const { title, description, writer } = req.body;
    let myUser;
    try {
      myUser = await User.findById(writer);
    } catch (e) {
      return console.log(e);
    }
    if (!myUser) {
      throw new Error("User not found");
    }
    const blog = new Blog({
      title,
      description,
      writer,
    });
    try {
    // Start a seesion to make multiple commands on the database.
      const session = await mongoose.startSession();
      session.startTransaction();
      await blog.save({ session });
      myUser.blogs.push(blog);
      await myUser.save({ session });
      await session.commitTransaction();
    } catch (err) {
      throw new Error(err);
    }

    return blog;
  }

  /**
 * Updates an existing blog object in the database.
 * @param {Object} req - The request object the blog ID and updated title and description data.
 * @returns {Promise<Object>} A Promise that resolves to the updated blog object.
 */
  async updateBlog(req) {
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
      throw new Error("Unable To Update The Blog");
    }
    return blog;
  }

  /**
 * Deletes an existing blog object from database.
 * @param {Object} req - The request object containing the blog ID.
 * @returns {Promise<Object>} A Promise that resolves to the deleted blog object.
 */
  async deleteBlog(req) {
    const { id } = req.params;

    let blog;
    try {
      blog = await Blog.findByIdAndRemove(id).populate("blog");
      await blog.user.blogs.pull(blog);
      await blog.user.save();
    } catch (e) {
      throw new Error(e);
    }
    return blog;
  }

  /**
 * Retrieves all blog objects associated with a specific user ID from the database.
 *  * @param {Object} req - The request object containing the user ID.
 * @returns {Promise<Object>} A Promise that resolves to the user object with the populated
 * "blogs" array.
 */
  async getByUserId(req) {
    const userId = req.params.id;
    let userBlogs;
    try {
      userBlogs = await User.findById(userId).populate("blogs");
    } catch (e) {
      throw new Error(e);
    }
    return userBlogs;
  }
}

const blogRepository = new BlogRepository();

export default blogRepository;
