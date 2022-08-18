import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Products from "../components/Products";

const ProductList = () => {
  const location = useLocation();
  const category = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    const values = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: values,
    });
  };

  return (
    <div className="">
      <h1 className="m-5 font-KdamThmorPro font-semibold text-2xl">{category.toUpperCase()}</h1>
      <div className="flex justify-between m-5">
        <div className="">
          <span className="text-xl font-semibold mr-4">Filter Products</span>

          <select name="color" className="p-2" onChange={handleFilters}>
            <option disabled selected>
              Colors
            </option>
            <option>White</option>
            <option className="bg-black text-white">Black</option>
            <option className="bg-red-500 text-white">Red</option>
            <option className="bg-blue-500 text-white">Blue</option>
            <option className="bg-yellow-500 text-white">Yellow</option>
            <option className="bg-green-500 text-white">Green</option>
          </select>

          <select name="size" className="mx-4 p-2" onChange={handleFilters}>
            <option disabled selected>
              Size
            </option>
            <option>XS</option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
          </select>
        </div>
        <div className="">
          <span className="text-xl font-semibold">Sort Products</span>
          <select
            className="mx-4 p-2"
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="asc">Price (ascending)</option>
            <option value="desc">Price (descending)</option>
          </select>
        </div>
      </div>
      <Products category={category} filters={filters} sort={sort} />
    </div>
  );
};

export default ProductList;
