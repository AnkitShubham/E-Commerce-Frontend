import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Product from "./components/Product";
import Category from "./components/Category";
import WelcomePage from "./components/WelcomePage";
import Account from "./components/Account";
import OrderPage from "./components/OrderPage";
import OrderPlaced from "./components/OrderPlaced";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/category/:categoryName" element={<Category />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/account" element={<Account />} />
        <Route path="/order/:productId" element={<OrderPage />} />
        <Route path="/orderplaced" element={<OrderPlaced />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
