import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext";

function Navbar() {
  const { cart } = useContext(CartContext);

  const isAdmin = true; // false to hide Admin link for normal users

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "18px 40px",
        backgroundColor: "maroon",
        color: "white"
      }}
    >
      {/* Logo */}
      <h2 style={{ fontSize: "26px", margin: 0 }}>RentEase</h2>

      {/* Menu */}
      <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
        <Link
          to="/"
          style={{ color: "white", textDecoration: "none", fontSize: "18px", fontWeight: "500" }}
        >
          Home
        </Link>

        <Link
          to="/about"
          style={{ color: "white", textDecoration: "none", fontSize: "18px", fontWeight: "500" }}
        >
          About
        </Link>

        <Link
          to="/bookings"
          style={{ color: "white", textDecoration: "none", fontSize: "18px", fontWeight: "500" }}
        >
          Bookings
        </Link>

        <Link
          to="/login"
          style={{ color: "white", textDecoration: "none", fontSize: "18px", fontWeight: "500" }}
        >
          Login
        </Link>

        {/* Cart with Item Count */}
        <Link
          to="/cart"
          style={{ color: "white", textDecoration: "none", fontSize: "18px", fontWeight: "500" }}
        >
          Cart ({cart.length})
        </Link>

        {/* Admin link: only visible if isAdmin = true */}
        {isAdmin && (
          <Link
            to="/admin"
            style={{
              color: "yellow",
              textDecoration: "none",
              fontSize: "18px",
              fontWeight: "500"
            }}
          >
            Admin
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;