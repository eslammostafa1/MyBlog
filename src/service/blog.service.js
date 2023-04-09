import BlogRepository from "../repository/blog.repository";

class BlogService {
  async getBlogs(req, res) {
    const myBlogs = await BlogRepository.getBlogs(req, res);
    return myBlogs;
  }

  async addBlog(req, res) {
    const myBlogs = await BlogRepository.addBlog(req, res);

    return myBlogs;
  }

  async updateBlog(req, res) {
    const updateBlog = await BlogRepository.updateBlog(req, res);

    return updateBlog;
  }

  async deleteBlog(req) {
    const blog = await BlogRepository.updateBlog(req);
    return blog;
  }

  async getByUserId(req) {
    const userBlogs = await BlogRepository.getByUserId(req);
    return userBlogs;
  }
}

const blogService = new BlogService();

export default blogService;
