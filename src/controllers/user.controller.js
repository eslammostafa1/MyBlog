import bcrypt from "bcryptjs";
import User from "../schemas/User.schema";
import { signupUserValidation, loginUserValidation } from "../validators/user.validator";

class UserController {
  // eslint-disable-next-line class-methods-use-this
  async getUsers(req, res) {
    let users;
    try {
      users = await User.find();
    } catch (e) {
      return console.log(e);
    }
    if (!users) {
      return res.status(404).json({
        message: "No Users Found",
      });
    }
    return res.status(200).json({ users });
  }

  // eslint-disable-next-line class-methods-use-this
  async getUserById(req, res) {
    const { id } = req.params;
    let user;
    try {
      user = await User.findById(id);
    } catch (e) {
      return console.log(e);
    }
    if (!user) {
      return res.status(404).json({ message: "No User Found" });
    }
    return res.status(200).json({ user });
  }

  // eslint-disable-next-line class-methods-use-this
  async signup(req, res) {
    const { error, value } = signupUserValidation.validate(req.body, { abortEarly: false });
    if (error) {
      console.log(error);
      return res.send(error.details);
    }
    const {
      name, email, password, confirmPassword,
    } = value;

    let myUser;
    try {
      myUser = await User.findOne({ email });
    } catch (e) {
      return console.log(e);
    }

    if (myUser) {
      return res
        .status(400)
        .json({ message: "User Exists!" });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Wrong password" });
    }
    const hashedPassword = bcrypt.hashSync(password);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      blogs: [],
    });

    try {
      await user.save();
      console.log("user created");
    } catch (e) {
      return console.log(e);
    }
    return res.status(201).json({ user });
  }

  // eslint-disable-next-line class-methods-use-this
  async login(req, res) {
    const { error, value } = loginUserValidation.validate(req.body, { abortEarly: false });

    if (error) {
      console.log(error);
      return res.send(error.details);
    }

    const { email, password } = value;
    let myUser;
    try {
      myUser = await User.findOne({ email });
    } catch (e) {
      return console.log(e);
    }
    if (!myUser) {
      return res.status(404).json({ message: "You are not a user!" });
    }

    const truePassword = bcrypt.compareSync(password, myUser.password);

    if (!truePassword) {
      return res.status(400).json({ message: "Incorrect Password" });
    }
    return res
      .status(200)
      .json({ message: "Login Successfull", user: myUser });
  }
}

const userController = new UserController();

export default userController;
