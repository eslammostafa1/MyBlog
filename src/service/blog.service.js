import BlogRepository from "../repository/blog.repository";

class BlogService {
  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  async getBlogs(req, res) {
    const myBlogs = await BlogRepository.getBlogs();
    return myBlogs;
  }

  // eslint-disable-next-line class-methods-use-this
  async addBlog(req, res) {
    const myBlogs = await BlogRepository.addBlog(req, res);

    return myBlogs;
  }

  // eslint-disable-next-line class-methods-use-this
  async updateBlog(req, res) {
    const updateBlog = await BlogRepository.updateBlog(req, res);

    return updateBlog;
  }

  // eslint-disable-next-line class-methods-use-this
  async deleteBlog(req) {
    const blog = await BlogRepository.updateBlog(req);
    return blog;
  }

  // eslint-disable-next-line class-methods-use-this
  async getByUserId(req) {
    const userBlogs = await BlogRepository.getByUserId(req);
    return userBlogs;
  }
}

const blogService = new BlogService();

export default blogService;
