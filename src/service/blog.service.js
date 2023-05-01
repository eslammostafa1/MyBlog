import BlogRepository from "../repository/blog.repository";

class BlogService {
  async getBlogs() {
    const myBlogs = await BlogRepository.getBlogs();
    return myBlogs;
  }

  async getBlog(req) {
    const myBlogs = await BlogRepository.getBlog(req);
    return myBlogs;
  }

  async addBlog(req) {
    const myBlogs = await BlogRepository.addBlog(req);

    return myBlogs;
  }

  async updateBlog(req) {
    const updateBlog = await BlogRepository.updateBlog(req);

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
