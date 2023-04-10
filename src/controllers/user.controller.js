import userService from "../service/user.service";
import { signupUserValidation, loginUserValidation } from "../validators/user.validator";

class UserController {
  // Retrieves all user objects from the database.
  async getUsers(req, res) {
    try {
      const users = await userService.getUsers();
      return res.status(200).json({ users });
    } catch (error) {
      console.log(`the error is :   ${error.message}`);
      return res.status(400).json({ error: error.message });
    }
  }

  // Retrieves a single user object with a specific user ID from the database.
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

  // Creates a new user object in the database.
  async signup(req, res) {
    // Validate the user signup body object
    const { err } = signupUserValidation.validate(req.body, { abortEarly: false });
    if (err) {
      console.log(err);
      return res.send(err.details);
    }
    try {
      const user = await userService.signup(req);
      return res.status(201).json({ user });
    } catch (error) {
      console.log(`the error is :   ${error.message}`);
      return res.status(400).json({ error: error.message });
    }
  }

  //  * Authenticates a user's login credentials against the database.
  async login(req, res) {
    // Validate the user login body object
    const { err } = loginUserValidation.validate(req.body, { abortEarly: false });

    if (err) {
      console.log(err);
      throw new Error(err.details);
    }

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
