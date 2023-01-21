import User from "../model/User";
import bcrypt from "bcryptjs";

export const getUsers = async (req, res) => {
  let users;
  try {
    users = await User.find();
  } catch (e) {
    console.log(e);
  }
  if (!users) {
    return res.status(404).json({ message: "No Users Found" });
  }
  return res.status(200).json({ users });
};

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
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
  const hashedPassword = bcrypt.hashSync(password);

  const user = new User({
    name,
    email,
    password: hashedPassword,
    blogs: [],
  });

  try {
    await user.save();
  } catch (e) {
    return console.log(e);
  }
  return res.status(201).json({ user });
};


export const login = async (req, res, next) => {
  const { email, password } = req.body;
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
};
