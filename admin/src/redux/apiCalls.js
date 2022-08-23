import axios from "axios";
import { getClientFail, getClientStart, getClientSuccess } from "./clientReducer";
import {
  addProductFailure,
  addProductStart,
  addProductSuccess,
  deleteProductFail,
  deleteProductStart,
  deleteProductSuccess,
  getProductFail,
  getProductStart,
  getProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
} from "./productsReducer";
import { loginFailure, loginStart, loginSuccess } from "./userReducer";
const token = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
  .currentUser.token;

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/auth/login",
      user
    );
    dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const response = await axios.get("http://localhost:5000/api/v1/product");
    dispatch(getProductSuccess(response.data));
  } catch (error) {
    dispatch(getProductFail());
  }
};

export const deleteProducts = async (dispatch, id) => {
  dispatch(deleteProductStart());
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/v1/product/${id}`,
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    dispatch(deleteProductSuccess(id));
  } catch (error) {
    dispatch(deleteProductFail());
  }
};

export const updateProducts = async (dispatch, products, id) => {
  dispatch(updateProductStart());
  try {
    const response = await axios.put(
      `http://localhost:5000/api/v1/product/${id}`,
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    dispatch(updateProductSuccess({ id, products }));
  } catch (error) {
    dispatch(updateProductFailure());
  }
};

export const createProducts = async (dispatch, products) => {
  dispatch(addProductStart());
  try {
    const response = await axios.post(
      `http://localhost:5000/api/v1/product`,
      products,
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    dispatch(addProductSuccess(response.data));
  } catch (error) {
    dispatch(addProductFailure());
  }
};

export const getAllCients = async (dispatch) => {
  dispatch(getClientStart());
  try {
    const response = await axios.get("http://localhost:5000/api/v1/user", {
      headers: { authorization: `Bearer ${token}` },
    });
    dispatch(getClientSuccess(response.data))
  } catch (error) {
    dispatch(getClientFail())
  }
};
