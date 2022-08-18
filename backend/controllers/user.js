import { unauthorizedAccess } from "../errors/unauthorized.js";
import UserModel from "../models/User.js";

export const getAllUsers = async (req, res) => {
  const queries = req.query.new;
  const users = queries
    ? await UserModel.find({}).sort({ _id: -1 }).limit(5)
    : await UserModel.find({});
  delete users.password;
  res.status(200).json(users);
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);
    const { password, ...otherDetails } = user._doc;
    res.status(200).json({ ...otherDetails });
  } catch (error) {
    res.status(404).json({ message: "something went wrong", error: error });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  if (id === req.user.userID || req.user.isAdmin) {
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } else {
    throw new unauthorizedAccess(
      "You are not allowed to edit user details...."
    );
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findByIdAndDelete(id);
    res.status(200).send({ message: "User has been deleted" });
  } catch (error) {
    res.status(404).json({ message: "something went wrong" });
  }
};

export const getStats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await UserModel.aggregate([
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
