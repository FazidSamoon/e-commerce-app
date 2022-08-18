import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
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
    amount: {
      type: Number,
      required: true,
    },
    address: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("Order", OrderSchema);
export default OrderModel;
