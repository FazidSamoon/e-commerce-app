import Express from "express";
import {
  deleteUser,
  getAllUsers,
  getStats,
  getUserById,
  updateUser,
} from "../controllers/user.js";
import { verifyAccessToken, verifyAdmin } from "../middleware/auth.js";

const userRouter = Express.Router();

userRouter.get("/", verifyAccessToken, getAllUsers);
userRouter.get("/stats" , verifyAccessToken , verifyAdmin , getStats)
userRouter.get("/:id", verifyAccessToken, getUserById);
userRouter.put("/:id", verifyAccessToken, updateUser);
userRouter.delete("/:id", verifyAccessToken, deleteUser);

export default userRouter;
