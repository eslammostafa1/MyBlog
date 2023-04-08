// import Blog from "../schemas/Blog.schema";
// import User from "../schemas/User.schema";
import blogService from "../service/blog.service";

class BlogController {
//   public CatsController (CatService catService) {
//     this.catService = catService;
// }

  // eslint-disable-next-line class-methods-use-this
  async getBlogs(req, res) {
    const myBlogs = await blogService.getBlogs();
    return res.status(200).json({ myBlogs });
  }

  // eslint-disable-next-line class-methods-use-this
  // async getBlogs(req, res) {
  //   let myBlogs;
  //   try {
  //     myBlogs = await Blog.find();
  //   } catch (err) {
  //     return console.log(err);
  //   }
  //   if (!myBlogs) {
  //     return res.status(404).json({ message: "Can not find blog" });
  //   }
  //   return res.status(200).json({ myBlogs });
  // }

  // eslint-disable-next-line class-methods-use-this
  // async addBlog(req, res) {
  //   try {
  //     const blog = await blogService.addBlog(req, res);
  //     return res.status(200).json({ blog });
  //   } catch (error) {
  //     // return res.status(200).json(error);
  //     console.log(error);
  //   }
  // }

  // eslint-disable-next-line class-methods-use-this
  async addBlog(req, res) {
    const blog = await blogService.addBlog(req, res);
    return res.status(200).json({ blog });
  }

  // eslint-disable-next-line class-methods-use-this
  // async addBlog(req, res) {
  //   const { error, value } = blogValidation.validate(req.body, { abortEarly: false });
  //   if (error) {
  //     console.log(error);
  //     return res.send(error.details);
  //   }
  //   const { title, description, writer } = value;

  //   let myUser;
  //   try {
  //     myUser = await User.findById(writer);
  //   } catch (e) {
  //     return console.log(e);
  //   }
  //   if (!myUser) {
  //     return res.status(400).json({ message: "User not found" });
  //   }
  //   const blog = new Blog({
  //     title,
  //     description,
  //     writer,
  //   });
  //   try {
  //     const session = await mongoose.startSession();
  //     session.startTransaction();
  //     await blog.save({ session });
  //     myUser.blogs.push(blog);
  //     await myUser.save({ session });
  //     await session.commitTransaction();
  //   } catch (err) {
  //     console.log(err);
  //     return res.status(500).json({ message: err });
  //   }

  //   return res.status(200).json({ blog });
  // }

  // eslint-disable-next-line class-methods-use-this
  async updateBlog(req, res) {
    const blog = await blogService.updateBlog(req, res);
    return res.status(200).json({ blog });
  }

  // eslint-disable-next-line class-methods-use-this
  async deleteBlog(req, res) {
    const blog = await blogService.deleteBlog(req);
    if (!blog) {
      return res.status(500).json({ message: "Unable To Delete" });
    }
    return res.status(200).json({ message: "Successfully Delete" });
  }

  // eslint-disable-next-line class-methods-use-this
  async getByUserId(req, res) {
    const userBlogs = await blogService.getByUserId(req);
    if (!userBlogs) {
      return res.status(404).json({ message: "Can not find blogs" });
    }
    return res.status(200).json({ user: userBlogs });
  }
}

const blogController = new BlogController();

export default blogController;
