import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const quantity = useSelector(state => state.cart.quantity)
  return (
    <div className="h-16 ">
      <div className="flex flex-row  justify-between p-3 ">
        <div className="flex-1 flex flex-row items-center rounded-sm">
          <h1>EN</h1>
          <div className="flex flex-row border-[0.5px] border-gray-300 ml-3 justify-center items-center">
            <input className="border-none" />
            <SearchIcon className="" style={{ color: "gray", fontSize: 16 }} />
          </div>
        </div>
        <div className="flex-1 text-center items-center">
          <h1 className="text-2xl font-KdamThmorPro font-extrabold">
            SHOPPING-CART
          </h1>
        </div>
        
        <div className="flex-1 flex flex-row justify-end items-center">
          <Link to="/register">
            <h1 className="text-base cursor-pointer mr-3 font-semibold">
              REGISTER
            </h1>
          </Link>
          <Link to="/login">
            <h1 className="text-base cursor-pointer mr-3 font-semibold">
              SIGN IN
            </h1>
          </Link>
          <Link to="/cart">
            <Badge badgeContent={quantity} color="primary">
              <ShoppingCartIcon className="cursor-pointer" />
            </Badge>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
