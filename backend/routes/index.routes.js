import Express from "express";
import authRouter from "./auth.routes.js";
import productRouter from "./product.routes.js";
import orderRouter from "./order.routes.js";
import userRouter from "./user.routes.js";
import cartRouter from "./cart.routes.js";
import stripeRoute from "./stripe.routes.js";
const router = Express.Router();

router.use("/auth", authRouter);
router.use("/cart", cartRouter);
router.use("/product", productRouter);
router.use("/order", orderRouter);
router.use("/user" , userRouter)
router.use("/payment", stripeRoute)

export default router;
