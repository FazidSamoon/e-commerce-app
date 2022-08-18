import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { Link } from "react-router-dom";

const SingleProduct = ({ product }) => {
  return (
    <div className="flex-1 m-1 h-80 min-w-[350px] flex items-center justify-center bg-[#f5fbf8] relative">
      <div className="w-[200px] absolute h-[200px] rounded-full bg-white  "></div>
      <img src={product.img} alt="" className="h-[75%] z-20" />
      <div className="z-30 absolute bg-[#0000004d]  w-full h-full flex justify-center items-center opacity-0 hover:opacity-100 transition-all ease-in-out duration-500 ">
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-1 hover:bg-[#e9f5f5] hover:scale-105 transition-all ease-in-out duration-150 cursor-pointer">
          <ShoppingCartIcon />
        </div>
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-1 hover:bg-[#e9f5f5] hover:scale-105 transition-all ease-in-out duration-150 cursor-pointer">
          <Link to={`/product/${product._id}`}><SearchIcon /></Link> 
        </div>
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-1 hover:bg-[#e9f5f5] hover:scale-105 transition-all ease-in-out duration-150 cursor-pointer">
          <FavoriteOutlinedIcon />
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
