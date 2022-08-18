import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    products: {
      type: [
        {
          productID: {
            type: String,
          },
          quantity: {
            type: Number,
            default: 1,
          },
        },
      ],
    },
  },
  { timestamps: true }
);

const CartModel = mongoose.model("Cart", CartSchema);
export default CartModel;
