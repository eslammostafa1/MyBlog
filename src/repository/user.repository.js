import bcrypt from "bcryptjs";
import User from "../schemas/User.schema";

class UserRepository {
  /**
 * Retrieves all user objects from the database.
 * @returns {Promise<object>} An object of all user objects in the database.
 */
  async getUsers() {
    let users;
    try {
      users = await User.find();
    } catch (e) {
      return console.log(e);
    }
    if (!users) {
      throw new Error(" No Users Found ");
    }
    return users;
  }

  /**
 * Retrieves a single user object with a specific user ID from the database.
 * @param {Object} req - The request object containing the user ID.
 * @returns {Promise<Object>} A Promise that resolves to the retrieved user object.
 */
  async getUserById(req) {
    const { id } = req.params;
    let user;
    try {
      user = await User.findById(id);
    } catch (e) {
      throw new Error(e);
    }
    return user;
  }

  /**
 * Creates a new user object in the database.
 * @param {Object} req - The request object containing the user's name, email, password,
 *  and confirmPassword fields.
 * @returns {Promise<Object>} A Promise that resolves to the created user object.
 */
  async signup(req) {
    const {
      name, email, password, confirmPassword,
    } = req.body;

    let myUser;
    try {
      myUser = await User.findOne({ email });
    } catch (e) {
      throw new Error(e);
    }

    if (myUser) {
      throw new Error("User Exists!");
    }

    // Make sure that user enter a correct password.
    if (password !== confirmPassword) {
      throw new Error("Wrong password");
    }

    // Hash the password to be able to save it in the database.
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
      throw new Error(e);
    }
    return user;
  }

  /**
 * Authenticates a user's login credentials against the database.
 * @param {Object} req - The request object containing the user's email and password fields.
 * @returns {Promise<Object>}  A Promise that resolves to the authenticated user object.
 */
  async login(req) {
    const { email, password } = req.body;
    let myUser;
    try {
      myUser = await User.findOne({ email });
    } catch (e) {
      throw new Error(e);
    }
    if (!myUser) {
      throw new Error("You are not a user!");
    }

    // The function then compares the password provided in the request
    // body with the hashed password stored in the user object using bcrypt.
    const truePassword = bcrypt.compareSync(password, myUser.password);

    if (!truePassword) {
      throw new Error("Incorrect Password");
    }
    return myUser;
  }
}

const userRepository = new UserRepository();

export default userRepository;
