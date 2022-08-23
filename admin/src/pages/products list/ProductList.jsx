import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { productRows } from "../../dummyData";
import { getProducts } from "../../redux/apiCalls";

const ProductList = () => {
  const [data, setData] = useState(productRows);
  const dispatch = useDispatch();
  const products = useSelector(state => state.product.products)

  useEffect(() => {
    getProducts(dispatch);
  }, []);

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable response={products} title={"Products"} />
      </div>
    </div>
  );
};

export default ProductList;
