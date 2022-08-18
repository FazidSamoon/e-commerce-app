import { unauthorizedAccess } from "../errors/unauthorized.js";
import OrderModel from "../models/Order.js";

export const createOrder = async (req, res) => {
  const order = await OrderModel.create(req.body);
  if (!order) {
    res.status(400).json({ message: "something went wrong" });
  }
  res.status(200).json(order);
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ message: "something went wrong" });
  }
};

export const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await OrderModel.findOne({ userID: id });
    res.status(200).json(order);
  } catch (error) {
    res.status(404).json({ message: "something went wrong", error: error });
  }
};

export const updateOrder = async (req, res) => {
  const { id } = req.params;
  if (id === req.user.userID || req.user.isAdmin) {
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } else {
    throw new unauthorizedAccess(
      "You are not allowed to edit user details...."
    );
  }
};

export const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await OrderModel.findByIdAndDelete(id);
    res.status(200).send({ message: "order has been deleted" });
  } catch (error) {
    res.status(404).json({ message: "something went wrong" });
  }
};

export const getStats = async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const prevMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  try {
    const income = await OrderModel.aggregate([
      {$match: {createdAt: { $gte: prevMonth }}},
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (error) {
    res.status(404).json({ message: "something went wrong", err: error });
  }
};
