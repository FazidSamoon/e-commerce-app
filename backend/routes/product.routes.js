import Express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/product.js";
import { verifyAccessToken, verifyAdmin } from "../middleware/auth.js";

const productRouter = Express.Router();

productRouter.post("/", verifyAccessToken, verifyAdmin, createProduct);
productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);
productRouter.put("/:id", verifyAccessToken, verifyAdmin, updateProduct);
productRouter.delete("/:id", verifyAccessToken, verifyAdmin, deleteProduct);

export default productRouter;
