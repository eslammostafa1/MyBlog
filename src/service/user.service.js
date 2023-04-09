import userRepository from "../repository/user.repository";

class UserService {
  async getUsers(req, res) {
    const users = await userRepository.getUsers(req, res);
    return users;
  }

  async getUserById(req) {
    const user = await userRepository.getUserById(req);
    return user;
  }

  async signup(req, res) {
    const user = await userRepository.signup(req, res);
    return user;
  }

  async login(req, res) {
    const myUser = await userRepository.login(req, res);
    return myUser;
  }
}

const userService = new UserService();

export default userService;
