import userRepository from "../repository/user.repository";

class UserService {
  // eslint-disable-next-line class-methods-use-this
  async getUsers(req, res) {
    const users = await userRepository.getUsers(req, res);
    return users;
  }

  // eslint-disable-next-line class-methods-use-this
  async getUserById(req) {
    const user = await userRepository.getUserById(req);
    return user;
  }

  // eslint-disable-next-line class-methods-use-this
  async signup(req, res) {
    const user = await userRepository.signup(req, res);
    return user;
  }

  // eslint-disable-next-line class-methods-use-this
  async login(req, res) {
    const myUser = await userRepository.login(req, res);
    return myUser;
  }
}

const userService = new UserService();

export default userService;
