import { unauthorizedAccess } from "../errors/unauthorized.js";
import { verifyToken } from "../utils/jwt.js";

export const verifyAccessToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new unauthorizedAccess("Not authorized...");
  }
  const token = authHeader.split(" ")[1];
  const decodeUser = verifyToken(token);
  if (!decodeUser) {
    throw new unauthorizedAccess("Not authorized...");
  }
  req.user = decodeUser;
  next();
};

export const verifyAdmin = (req, res, next) => {
  if(!req.user.isAdmin) {
    throw new unauthorizedAccess("Not authorized...");
  } 
  next()
};
