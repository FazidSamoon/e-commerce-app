import bcrypt from "bcryptjs";
import { badAuth } from "../errors/bad-auth.js";

export const bcryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(Number(process.env.SALT_VALUE));
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const comparePassword = async(userPassword , hashedPassword) => {
  const isPasswordCorrect = await bcrypt.compare(userPassword , hashedPassword)
  if(!isPasswordCorrect) {
    throw new badAuth("username or password incorrect")
  }
  return isPasswordCorrect
}