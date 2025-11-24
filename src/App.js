import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Shop from "./pages/Shop";
import Contact from "./pages/Contact";
import Repair from "./pages/Repair";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

function App() {
  const [user, setUser] = useState(null);   // login state
  const [cart, setCart] = useState([]);     // cart state

  // Login function
  const login = (username) => {
    setUser({ username });
  };

  // Logout function (cart stays)
  const logout = () => {
    setUser(null);
  };

  // Add product to cart
  const addToCart = (product) => {
    const exist = cart.find((p) => p.id === product.id);
    if (exist) {
      setCart(
        cart.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Remove product from cart
  const removeFromCart = (id) => {
    setCart(cart.filter((p) => p.id !== id));
  };

  return (
    <Router>
      <Navbar user={user} logout={logout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/shop"
          element={
            <Shop
              user={user}
              addToCart={addToCart}
            />
          }
        />

        <Route
          path="/contact"
          element={<Contact user={user} />}
        />

        <Route
          path="/repair"
          element={<Repair user={user} />}
        />

        <Route
          path="/login"
          element={<Login login={login} />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/cart"
          element={
            <Cart
              user={user}
              cart={cart}
              removeFromCart={removeFromCart}
            />
          }
        />

        <Route
          path="/checkout"
          element={
            <Checkout
              user={user}
              cart={cart}
            />
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}
export default App;