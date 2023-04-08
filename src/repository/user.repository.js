import bcrypt from "bcryptjs";
import User from "../schemas/User.schema";
import { signupUserValidation, loginUserValidation } from "../validators/user.validator";

class UserRepository {
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
    return users;
  }

  // eslint-disable-next-line class-methods-use-this
  async getUserById(req) {
    const { id } = req.params;
    let user;
    try {
      user = await User.findById(id);
    } catch (e) {
      return console.log(e);
    }
    return user;
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
    return user;
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
    return myUser;
  }
}

const userRepository = new UserRepository();

export default userRepository;
