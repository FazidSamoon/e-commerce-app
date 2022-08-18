import Jwt from "jsonwebtoken";

export const generateAccessToken = (user) => {
  const { _id, isAdmin } = user;
  const token = Jwt.sign(
    { userID: _id, isAdmin: isAdmin },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.JWT_EXPIRATION_TIME }
  );
  return token;
};


export const verifyToken = (token) => {
    return Jwt.verify(token , process.env.JWT_SECRET_KEY)
}