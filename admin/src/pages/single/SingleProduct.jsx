import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import CustomProductsAndUser from "../../components/chart/customProductsAndUser";
import CustomTable from "../../components/table/CustomTable";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMemo, useState } from "react";

const Single = () => {
  const location = useLocation();
  const productID = location.pathname.split("/")[2];
  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productID)
  );
  

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img src={product.img} alt="" className="itemImg" />
              <div className="details">
                <h1 className="itemTitle">{product.title.toUpperCase()}</h1>
                <div className="detailItem">
                  <span className="itemKey">ID:</span>
                  <span className="itemValue">{product._id}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">In stock:</span>
                  <span className="itemValue">{product.instock}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Description:</span>
                  <span className="itemValue">{product.desc}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Price:</span>
                  <span className="itemValue">$ {product.price}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <CustomProductsAndUser aspect={3 / 1} title="Product sales ( Last 6 Months)" url={`http://localhost:5000/api/v1/order/stats/?pid=${product._id}`}/>
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <CustomTable url={`http://localhost:5000/api/v1/order/stats/?pid=${product._id}`} />
        </div>
      </div>
    </div>
  );
};

export default Single;
