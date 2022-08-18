import { badAuth } from "../errors/bad-auth.js";
import UserModel from "../models/User.js";
import { bcryptPassword, comparePassword } from "../utils/bcryptPassword.js";
import { generateAccessToken } from "../utils/jwt.js";

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !password || !email) {
    throw new badAuth("Please provide username email and password");
  }

  // const hashedPassword = await bcryptPassword(password);
  // const userObject = { username, email, password: hashedPassword };
  // const user = await UserModel.create({ ...userObject })
  //   .then(() => console.log("user created succesuly"))
  //   .catch((err) => console.log(err));

  const user = await UserModel.create(req.body);
  const token = await generateAccessToken(user);
  res.status(200).json({ user, token });
};

export const loginUser = async (req, res) => {
  const { username, userPassword } = req.body;
  const user = await UserModel.findOne({ username: username });
  if (!user) {
    throw new badAuth("No user with given username");
  }
  const hashedPassword = await user.password;
  const compareHashedPassword = await comparePassword(
    req.body.password,
    hashedPassword
  );
  const { password, ...otherDetails } = user._doc;

  const token = await generateAccessToken(user);

  res.status(200).json({ ...otherDetails, token });
};
