import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import Repair from "./pages/Repair";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import AdminLayout from "./admin/AdminLayout";
import Orders from "./admin/Orders";
import Messages from "./admin/Messages";
import Repairs from "./admin/Repairs";
import Users from "./admin/Users";
import Admins from "./admin/Admins";
import Categories from "./admin/Categories";

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}

      <Routes>
        
        <Route path="/" element={<Home />} />

        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/repair" element={<Repair />} />
        <Route path="/about" element={<About />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ADMIN */}
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route index element={<Navigate to="orders" />} />
          <Route path="orders" element={<Orders />} />
          <Route path="messages" element={<Messages />} />
          <Route path="repairs" element={<Repairs />} />
          <Route path="users" element={<Users />} />
          <Route path="admins" element={<Admins />} />
          <Route path="categories" element={<Categories />} />
        </Route>

        {/* ANY WRONG LINK -> HOME */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  );
}
