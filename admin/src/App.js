import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/users list/List";
import ProductList from "./pages/products list/ProductList";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import NewProduct from "./pages/new/NewProduct";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import SingleProduct from './pages/single/SingleProduct'

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const admin = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.isAdmin
  const token = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.token

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />

          {admin && 
          <Route path="/">
            <Route index element={<Home token={token} />} />

            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="products">
              <Route index element={<ProductList />} />
              <Route path=":productId" element={<SingleProduct />} />
              <Route
                path="new"
                element={<NewProduct inputs={productInputs} title="Add New Product" />}
              />
            </Route>
          </Route>
          }
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
