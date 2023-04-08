import userService from "../service/user.service";

class UserController {
  // eslint-disable-next-line class-methods-use-this
  async getUsers(req, res) {
    const users = await userService.getUsers(req, res);
    return res.status(200).json({ users });
  }

  // eslint-disable-next-line class-methods-use-this
  async getUserById(req, res) {
    const user = await userService.getUserById(req);
    if (!user) {
      return res.status(404).json({ message: "No User Found" });
    }
    return res.status(200).json({ user });
  }

  // eslint-disable-next-line class-methods-use-this
  async signup(req, res) {
    const user = await userService.signup(req);
    return res.status(201).json({ user });
  }

  // eslint-disable-next-line class-methods-use-this
  async login(req, res) {
    const myUser = await userService.getUserById(req);
    return res
      .status(200)
      .json({ message: "Login Successfull", user: myUser });
  }
}

const userController = new UserController();

export default userController;
