import blogService from "../service/blog.service";
import blogValidation from "../validators/blog.validator";

class BlogController {
  // Retrieves all blog objects from a database.
  async getBlogs(req, res) {
    try {
      const myBlogs = await blogService.getBlogs();
      return res.status(200).json({ myBlogs });
    } catch (error) {
      console.log(`the error is :   ${error.message}`);
      return res.status(400).json({ error: error.message });
    }
  }

  async getBlog(req, res) {
    try {
      const myBlog = await blogService.getBlog(req);
      return res.status(200).json({ myBlog });
    } catch (error) {
      console.log(`the error is :   ${error.message}`);
      return res.status(400).json({ error: error.message });
    }
  }

  // Adds a new blog object to a database.
  async addBlog(req, res) {
    const { error } = blogValidation.validate(req.body, { abortEarly: false });
    if (error) {
      console.log(error);
      return res.send({ error: error.message });
    }
    try {
      const blog = await blogService.addBlog(req);
      return res.status(200).json({ blog });
    } catch (err) {
      console.log(`the error is :   ${err.message}`);
      return res.status(400).json({ error: err.message });
    }
  }

  // Update a existing blog using ID.
  async updateBlog(req, res) {
    try {
      const blog = await blogService.updateBlog(req);
      return res.status(200).json({ blog });
    } catch (error) {
      console.log(`the error is :   ${error.message}`);
      return res.status(400).json({ error: error.message });
    }
  }

  // Deletes an existing blog object from database.
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

  // Retrieves all blog objects associated with a specific user ID from the database.
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
