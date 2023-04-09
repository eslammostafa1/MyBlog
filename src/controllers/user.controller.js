import userService from "../service/user.service";

class UserController {
  // get all user with the blogs
  async getUsers(req, res) {
    try {
      const users = await userService.getUsers(req, res);
      return res.status(200).json({ users });
    } catch (error) {
      console.log(`the error is :   ${error.message}`);
      return res.status(400).json({ error: error.message });
    }
  }

  // get a user by using his id
  async getUserById(req, res) {
    try {
      const user = await userService.getUserById(req);
      if (!user) {
        return res.status(404).json({ message: "No User Found" });
      }
      return res.status(200).json({ user });
    } catch (error) {
      console.log(`the error is :   ${error.message}`);
      return res.status(400).json({ error: error.message });
    }
  }

  // add a user to the db
  async signup(req, res) {
    try {
      const user = await userService.signup(req);
      return res.status(201).json({ user });
    } catch (error) {
      console.log(`the error is :   ${error.message}`);
      return res.status(400).json({ error: error.message });
    }
  }

  // login an existing user
  async login(req, res) {
    try {
      const myUser = await userService.getUserById(req);
      return res
        .status(200)
        .json({ message: "Login Successfull", user: myUser });
    } catch (error) {
      console.log(`the error is :   ${error.message}`);
      return res.status(400).json({ error: error.message });
    }
  }
}

const userController = new UserController();

export default userController;
