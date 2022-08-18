import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { addProduct } from "../redux/cartReducer";
import { useDispatch } from "react-redux";

const SingleProduct = () => {
  let [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({});
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  const dispatch = useDispatch();

  const handleQuantity = (type) => {
    if (type === "dec") quantity > 1 && setQuantity(quantity - 1);
    else if (type === "inc") setQuantity(quantity + 1);
  };
  const location = useLocation();
  const productID = location.pathname.split("/")[2];
  const handleCart = () => {
    dispatch(
      addProduct({ ...product, quantity, color, size })
    );
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/product/${productID}`
        );
        // const response = await publicRequests.get(`/product/${productID}`)
        setProduct(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [productID]);

  return (
    <div className="flex flex-row p-10">
      <div className="flex-1">
        <img
          src={product.img}
          alt="product"
          className="w-full h-[90vh] object-cover"
        />
      </div>
      <div className="flex-1 px-5">
        <h1 className="font-KdamThmorPro font-semibold text-3xl">
          {product.title}
        </h1>
        <p className="my-6">{product.desc}</p>
        <span className="font-KdamThmorPro font-extralight text-xl">$ {product.price}</span>

        <div className="flex w-1/2 justify-between">
          <div className="flex items-center  flex-1">
            <h1 className="mr-4">Colors</h1>
            {product.color &&
              product.color.map((color) => (
                <div
                  className={`w-4 h-4 bg-red-[${color}] mr-2 cursor-pointer rounded-full`}
                  style={{ backgroundColor: `${color}` }}
                  key={color}
                  onClick={() => setColor(color)}
                />
              ))}
          </div>

          <div className="flex-1 flex">
            <h1 className="mr-4">Size</h1>
            <select onChange={(e) => setSize(e.target.value)} className="flex">
              <option disabled selected>
                Size
              </option>

              {product.size?.map((size) => (
                <option>{size}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="w-1/2 flex justify-between mt-8">
          <div className="flex items-center">
            <RemoveIcon
              className="cursor-pointer"
              onClick={() => handleQuantity("dec")}
            />
            <span className="font-bold w-8 h-8 border-2 rounded-lg border-teal-600 flex items-center justify-center mx-1">
              {quantity}
            </span>
            <AddIcon
              className="cursor-pointer"
              onClick={() => handleQuantity("inc")}
            />
          </div>

          <div
            onClick={handleCart}
            className="h-10 w-36 border-2 border-teal-600 rounded-lg flex items-center justify-center cursor-pointer hover:bg-teal-600 hover:text-white"
          >
            ADD TO CART
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
