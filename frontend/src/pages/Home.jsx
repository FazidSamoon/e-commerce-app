import React from "react";
import Catogeries from "../components/Catogeries";
import Products from "../components/Products";
import Slider from "../components/Slider";

const Home = () => {
  return (
    <div>
      <Slider />
      <Catogeries />
      <Products />
    </div>
  );
};

export default Home;
