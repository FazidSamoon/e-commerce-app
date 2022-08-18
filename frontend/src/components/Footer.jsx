import React from "react";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Footer = () => {
  return (
    <div className=" flex">
      <div className="flex-1 flex-col p-6">
        <span className="font-KdamThmorPro font-extrabold text-xl">SHOPPING CART</span>
        <p className="font-KdamThmorPro my-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel non,
          totam aliquid sit iure enim temporibus ipsam ipsa, ea tempore officiis
          voluptas laudantium sapiente repudiandae iusto nobis asperiores
          blanditiis minus?
        </p>
        <div className="flex items-center">
            <FacebookIcon className="text-[#385999] cursor-pointer"/>
            <InstagramIcon className="text-[#e4405f] mx-5 cursor-pointer"/>
            <TwitterIcon className="text-[#55acee] cursor-pointer"/>
        </div>
      </div>
      <div className="flex-1 p-6">
        <h3 className="mb-5 text-base font-KdamThmorPro font-semibold">Useful Links</h3>
        <ul className="grid grid-cols-2 w-[100%] justify-between">
            <li>Home</li>
            <li>Cart</li>
            <li>Men Fashion</li>
            <li>Women Fashion</li>
            <li>Accessories</li>
            <li>My Account</li>
            <li>Order Tracking</li>
            <li>Wishlist</li>
            <li>Terms</li>
            <li>Terms</li>
        </ul>
      </div>
      <div className="flex-1 flex flex-col p-6">
        <h1 className="mb-5 text-base font-KdamThmorPro font-semibold">Contact</h1>
        <span className="cursor-pointer"><LocationOnIcon className="pr-1" />43, Colombo Sri Lanka</span>
        <span className="my-5 cursor-pointer"><LocalPhoneIcon className="pr-1" />+94 44 4321 345</span>
        <span className="cursor-pointer"><EmailIcon className="pr-1" />shoppingcart@gmail.com</span>
        <div className="flex mt-4   ">
            <img src="images/visa.png" alt="visa payment" className="w-10" />
            <img src="images/master-card.png" alt="master payment" className="w-10 mx-4"/>
        </div>
      </div>
    </div>
  );
};

export default Footer;
