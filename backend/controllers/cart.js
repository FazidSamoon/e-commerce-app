import { unauthorizedAccess } from "../errors/unauthorized.js";
import CartModel from "../models/Cart.js";

export const createCart = async (req, res) => {
  const cart = await CartModel.create(req.body);
  if (!cart) {
    res.status(400).json({ message: "something went wrong" });
  }
  res.status(200).json(cart);
};

export const getAllCarts = async (req, res) => {
  try {
    const carts = await CartModel.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(400).json({ message: "something went wrong" });
  }
};

export const getUserCart = async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await CartModel.findOne({ userID: id });
    res.status(200).json(cart);
  } catch (error) {
    res.status(404).json({ message: "something went wrong", error: error });
  }
};

export const updateCart = async (req, res) => {
  const { id } = req.params;
  if (id === req.user.userID || req.user.isAdmin) {
    const updatedCart = await CartModel.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } else {
    throw new unauthorizedAccess(
      "You are not allowed to edit user details...."
    );
  }
};

export const deleteCart = async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await CartModel.findByIdAndDelete(id);
    res.status(200).send({ message: "cart has been deleted" });
  } catch (error) {
    res.status(404).json({ message: "something went wrong" });
  }
};

export const getStats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await CartModel.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: "something went wrong", error: error });
  }
};
