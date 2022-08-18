import Express from "express";
import { createOrder, deleteOrder, getAllOrders, getOrderById, getStats, updateOrder } from "../controllers/order.js";
import { verifyAccessToken, verifyAdmin } from "../middleware/auth.js";

const orderRouter = Express.Router()

orderRouter.post("/" , verifyAccessToken, createOrder)
orderRouter.get("/stats" , verifyAccessToken , verifyAdmin , getStats)
orderRouter.get("/" , verifyAccessToken , verifyAdmin , getAllOrders)
orderRouter.get("/:id" , verifyAccessToken , getOrderById)
orderRouter.put("/:id" , verifyAccessToken , verifyAdmin , updateOrder)
orderRouter.delete("/:id" , verifyAccessToken , verifyAdmin , deleteOrder)


export default orderRouter