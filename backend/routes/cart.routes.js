import Express from "express";
import { createCart, deleteCart, getAllCarts, getUserCart, updateCart } from "../controllers/cart.js";
import { verifyAccessToken, verifyAdmin } from "../middleware/auth.js";

const cartRouter = Express.Router()

cartRouter.get("/" , verifyAccessToken , verifyAdmin , getAllCarts)
cartRouter.post("/",verifyAccessToken , createCart)
cartRouter.get("/:id",verifyAccessToken , getUserCart)
cartRouter.put("/:id",verifyAccessToken , updateCart)
cartRouter.delete("/:id",verifyAccessToken , deleteCart)

export default cartRouter