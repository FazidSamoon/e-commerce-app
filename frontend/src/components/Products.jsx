import { useEffect, useState } from "react";
import axios from "axios";
import SingleProduct from "./SingleProduct";

const Products = ({ category, sort, filters }) => {
  const [products, setProducts] = useState([]);
  let [filterProduct, setFilterProduct] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(
          category
            ? `http://localhost:5000/api/v1/product/?category=${category}`
            : "http://localhost:5000/api/v1/product"
        );
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [category]);

  useEffect(() => {
    category &&
      setFilterProduct(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [category, filters, products]);


  useEffect(() => {
    if((sort === "newest")){
      setFilterProduct((prev) => 
        [...prev].sort((a,b) => a.createdAt - b.createdAt)
      )
    }

    if((sort === "asc")){
      setFilterProduct((prev) => 
        [...prev].sort((a,b) => a.price - b.price)
      )
    }

    if((sort === "desc")){
      setFilterProduct((prev) => 
        [...prev].sort((a,b) => b.price - a.price)
      )
    }
  }, [sort]);



  return (
    <div className="flex flex-wrap p-5 justify-between">
      {category ? filterProduct.map((product) => {
        return <SingleProduct product={product} key={product.id} />;
      }) : products.map((product) => {
        return <SingleProduct product={product} key={product.id} />;
      })}
    </div>
  );
};

export default Products;
