import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./Navbar";
import About from "./About";
import ProductDetails from "./ProductDetails";
import Login from "./Login";
import Register from "./Register";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Bookings from "./Bookings";
import PrivateRoute from "./PrivateRoute";
import Admin from "./Admin";
import { AuthContext } from "./AuthContext";
import AdminSupport from "./AdminSupport";
import Payment from "./Payment";
function App() {

  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [search, setSearch] = useState("");
  const { addToCart } = useContext(CartContext);
  const [, setUser] = useState(null);
  const [likedItems, setLikedItems] = useState({});


  useEffect(() => {
    axios.get("http://localhost:5000/api/products/")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

const filteredProducts = products
  .filter(product =>
    selectedCategory === "all" || product.category === selectedCategory
  )
  .filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Router>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={
            <div>

              {/* HERO SECTION */}
              <div
                style={{
                  backgroundImage:
                    "url('https://theroomeffect.com/cdn/shop/files/MM_Website_Images.png?v=1700974560&width=3840')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  height: "70vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  textAlign: "center"
                }}
              >
                <div
                  style={{
                    background: "rgba(0,0,0,0.5)",
                    padding: "40px",
                    borderRadius: "10px"
                  }}
                >
                  <h1 style={{ fontSize: "48px", marginBottom: "10px" }}>
                    Rent Smart, Live Better
                  </h1>

                  <p style={{ fontSize: "20px", marginBottom: "20px" }}>
                    Premium Furniture & Appliances on Rent
                  </p>

                  <a href="#products">
                    <button
                      style={{
                        padding: "12px 25px",
                        fontSize: "16px",
                        background: "maroon",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer"
                      }}
                    >
                      Browse Products
                    </button>
                  </a>

                </div>
              </div>

              {/* CATEGORIES */}
<div style={{ padding: "40px 20px", background: "#f5f5f5" }}>

<h2 style={{ textAlign: "center", marginBottom: "20px" }}>
Browse By Categories
</h2>

<div
style={{
display: "flex",
justifyContent: "center",
gap: "15px",
flexWrap: "wrap"
}}
>

<button
onClick={() => setSelectedCategory("all")}
style={{
padding:"10px 20px",
border:"none",
borderRadius:"6px",
background:selectedCategory==="all"?"maroon":"#ddd",
color:selectedCategory==="all"?"white":"black",
cursor:"pointer"
}}
>
All Products
</button>

<button
onClick={() => setSelectedCategory("Furniture")}
style={{
padding:"10px 20px",
border:"none",
borderRadius:"6px",
background:selectedCategory==="Furniture"?"maroon":"#ddd",
color:selectedCategory==="Furniture"?"white":"black",
cursor:"pointer"
}}
>
Furniture
</button>

<button
onClick={() => setSelectedCategory("Appliances")}
style={{
padding:"10px 20px",
border:"none",
borderRadius:"6px",
background:selectedCategory==="Appliances"?"maroon":"#ddd",
color:selectedCategory==="Appliances"?"white":"black",
cursor:"pointer"
}}
>
Appliances
</button>

</div>

</div>

              {/* PRODUCTS */}
              <div id="products" style={{ padding: "20px" }}>

                <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
                  Our Products
                </h2>
                  <div style={{ textAlign: "center", marginBottom: "20px" }}>
                  <input type="text" 
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                           padding: "10px",
                           width: "300px",
                           borderRadius: "6px",
                           border: "1px solid #ccc"
                         }}
                 />
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "20px"
                  }}
                >

                  {filteredProducts.map(product => (
                    <div
                      key={product._id}
                      style={{
                        border: "1px solid #ddd",
                        borderRadius: "10px",
                        padding: "15px",
                        textAlign: "center",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        background: "white",
                        display: "flex",
                        flexDirection: "column"
                      }}
                    >

                      {/* CLICKABLE PRODUCT */}
                      <Link
                        to={`/product/${product._id}`}
                        style={{ textDecoration: "none", color: "black" }}
                      >

                        <img
                          src={product.image}
                          alt={product.name}
                          style={{
                            width: "100%",
                            height: "260px",
                            objectFit: "cover",
                            borderRadius: "8px"
                          }}
                        />

                        <h2>{product.name}</h2>

                      </Link>

                      <p>Rent: ₹{product.rentPrice}/month</p>

{/*  OUT OF STOCK TEXT */}
{!product.isAvailable && (
  <p style={{ color: "red", fontWeight: "bold" }}>
    Out of Stock
  </p>
)}

<div style={{ display: "flex", gap: "8px", marginTop: "auto" }}>

  <button
    onClick={() => {
      if (!product.isAvailable) return;
      addToCart(product);
      alert("Item added to cart");
    }}
    disabled={!product.isAvailable}
    style={{
      padding:"10px 15px",
      background: product.isAvailable ? "maroon" : "gray",
      color:"white",
      border:"none",
      borderRadius:"5px",
      cursor: product.isAvailable ? "pointer" : "not-allowed",
      flex: 1
    }}
  >
    {product.isAvailable ? "Add to Cart" : "Not Available"}
  </button>

{/*  Heart Button */}
<button
  onClick={() =>
    setLikedItems(prev => ({
      ...prev,
      [product._id]: !prev[product._id]
    }))
  }
  style={{
    padding:"10px",
    background:"white",
    border:"1px solid #ddd",
    borderRadius:"5px",
    cursor:"pointer",
    fontSize:"16px",
    color: likedItems[product._id] ? "red" : "black"
  }}
>
  ♥
</button>

</div>

                    </div>
                  ))}

                </div>

              </div>

            </div>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/about" element={<About />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/bookings" element={<Bookings />} />
<Route
  path="/admin"
  element={<PrivateRoute element={<Admin />} isAdmin={true} />}
/>
<Route path="/admin-support" element={<AdminSupport />} />
      </Routes>

    </Router>
  );
}

export default App;