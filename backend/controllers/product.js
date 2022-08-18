import { unauthorizedAccess } from "../errors/unauthorized.js";
import ProductModel from "../models/Products.js";

export const createProduct = async (req, res) => {
  const product = await ProductModel.create(req.body);
  if (!product) {
    res.status(400).json({ message: "something went wrong" });
  }
  res.status(200).json(product);
};

export const getAllProducts = async (req, res) => {
  const queries = req.query.new;
  const { category } = req.query;
  try {
    let products;
    if (queries) {
      products = await ProductModel.find({}).sort({ _id: -1 }).limit(5);
    } else if (category) {
      products = await ProductModel.find({ categories: { $in: [category] } });
    } else {
      products = await ProductModel.find({});
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: "something went wrong" });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: "something went wrong", error: error });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  if (id === req.user.userID || req.user.isAdmin) {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } else {
    throw new unauthorizedAccess(
      "You are not allowed to edit user details...."
    );
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findByIdAndDelete(id);
    res.status(200).send({ message: "Product has been deleted" });
  } catch (error) {
    res.status(404).json({ message: "something went wrong" });
  }
};

export const getStats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await ProductModel.aggregate([
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
