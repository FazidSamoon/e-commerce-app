import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
const key = process.env.REACT_APP_STRIPE;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate()

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makePayment = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/v1/payment",
          {
            headers: {
              Authorization: `Bearer ${stripeToken.id}`,
            },
            tokenId: stripeToken.id,
            amount: 500,
          }
        );
          navigate("/success")
        console.log("response ", response);
      } catch (err) {
        console.log(err);
      }
    };
    makePayment();
  }, [stripeToken]);

  console.log(stripeToken);

  return (
    <div className="p-5">
      <h1 className="text-center font-normal text-xl">CART</h1>
      <div className="flex items-center justify-between">
        <button className="p-2 font-semibold cursor-pointer border-[1px] border-black">
          CONTINUE SHOPPING
        </button>
        <div className="flex ">
          <h1 className="cursor-pointer mr-2 underline">Shopping bag(2)</h1>
          <h1 className="cursor-pointer underline">Your wishlist(0)</h1>
        </div>
        <button className="p-2 font-semibold cursor-pointer border-[1px] bg-black text-white">
          CHECKOUT NOW
        </button>
      </div>

      <div className="flex justify-between mt-8">
        <div className="flex-[3] flex flex-col">
          {cart.products.map((product) => (
            <>
              <div className="flex flex-row">
                <div className="flex flex-row flex-1">
                  <div className="flex items-center justify-center">
                    <img
                      src={product.img}
                      alt="product"
                      className="w-[200px] h-[200px] object-fit"
                    />
                  </div>

                  <div className="flex p-5 flex-col justify-around">
                    <h1>
                      <span className="font-bold">Product: </span>{" "}
                      {product.title}
                    </h1>
                    <h1>
                      <span className="font-bold">ID: </span>
                      {product._id}
                    </h1>
                    <h1>
                      <span className="font-bold">Product: </span>
                      {product.desc}
                    </h1>
                    <div className="flex items-center">
                      <h1 className="font-bold">Color: </h1>{" "}
                      <div
                        className="ml-2 w-4 h-4 cursor-pointer rounded-full"
                        style={{ backgroundColor: `${product.color}` }}
                      ></div>
                    </div>
                    <h1>
                      <span className="font-bold">Size: </span>
                      {product.size}
                    </h1>
                  </div>
                </div>

                <div className="flex flex-col flex-1 items-center justify-center">
                  <div className="flex items-center">
                    <RemoveIcon className="" />
                    <span className="font-bold">{product.quantity}</span>
                    <AddIcon />
                  </div>
                  <h1 className="font-bold">
                    $ {product.price * product.quantity}
                  </h1>
                </div>
              </div>
              <hr className="h-1 bg-gray-500" />
            </>
          ))}
        </div>

        <div className="flex-1 border-[1px] border-gray-600 p-5 h-[60vh]">
          <h1 className="font-bold">ORDER SUMMARY</h1>
          <div>
            <h1>Subtotal</h1>
            <h1>$ {cart.total}</h1>
          </div>
          <div className="mt-2">
            <h1>Estimated Shipping</h1>
            <h1>$ 50</h1>
          </div>
          <div className="mt-2">
            <h1>Shipping Discount</h1>
            <h1>$ 10</h1>
          </div>
          <div className="mt-2">
            <h1>Total</h1>
            <h1>$ {cart.total}</h1>
          </div>
          <StripeCheckout
            name="SHOPPING CART"
            image="https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/858958/shopping-cart-clipart-md.png"
            billingAddress
            shippingAddress
            description={`Your total is $ ${cart.total}`}
            amount={cart.total * 100}
            token={onToken}
            stripeKey={key}
          >
            <button className="bg-black text-gray-200 p-4 mt-3">
              CHECKOUT NOW
            </button>
          </StripeCheckout>
        </div>
      </div>
    </div>
  );
};

export default Cart;
