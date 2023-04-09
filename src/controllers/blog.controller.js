// import Blog from "../schemas/Blog.schema";
// import User from "../schemas/User.schema";
import blogService from "../service/blog.service";

class BlogController {
  // get all blogs on the db
  async getBlogs(req, res) {
    try {
      const myBlogs = await blogService.getBlogs();
      return res.status(200).json({ myBlogs });
    } catch (error) {
      console.log(`the error is :   ${error.message}`);
      return res.status(400).json({ error: error.message });
    }
  }

  // add new blog to db
  async addBlog(req, res) {
    try {
      const blog = await blogService.addBlog(req, res);
      return res.status(200).json({ blog });
    } catch (error) {
      console.log(`the error is :   ${error.message}`);
      return res.status(400).json({ error: error.message });
    }
  }

  // update a existing blog using id
  async updateBlog(req, res) {
    try {
      const blog = await blogService.updateBlog(req, res);
      return res.status(200).json({ blog });
    } catch (error) {
      console.log(`the error is :   ${error.message}`);
      return res.status(400).json({ error: error.message });
    }
  }

  // remove unwanted blog
  async deleteBlog(req, res) {
    try {
      const blog = await blogService.deleteBlog(req);
      if (!blog) {
        return res.status(500).json({ message: "Unable To Delete" });
      }
      return res.status(200).json({ message: "Successfully Delete" });
    } catch (error) {
      console.log(`the error is :   ${error.message}`);
      return res.status(400).json({ error: error.message });
    }
  }

  // get specific blog using id
  async getByUserId(req, res) {
    try {
      const userBlogs = await blogService.getByUserId(req);
      if (!userBlogs) {
        return res.status(404).json({ message: "Can not find blogs" });
      }
      return res.status(200).json({ user: userBlogs });
    } catch (error) {
      console.log(`the error is :   ${error.message}`);
      return res.status(400).json({ error: error.message });
    }
  }
}

const blogController = new BlogController();

export default blogController;
