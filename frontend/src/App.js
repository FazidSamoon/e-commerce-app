import "./App.css";
import Announcement from "./components/Announcement";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Newsletter from "./components/Newsletter";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import SingleProduct from "./pages/SingleProduct";
import { Navigate, Route, Routes } from "react-router-dom";
import Success from "./pages/Success";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user.currentUser)
  return (
    <div className="App ">
      <Navbar />
      <Announcement />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/succcess" element={<Success />} />
        <Route path="/login" element={user? <Navigate to="/" replace /> : <Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      <Newsletter />
      <Footer />
    </div>
  );
}

export default App;
