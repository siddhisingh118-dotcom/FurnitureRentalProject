import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import { Link, useNavigate } from "react-router-dom";

function Cart() {
  
  const { cart, setCart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  // Increase quantity
  const increaseQty = (id) => {

    const updatedCart = cart.map(item =>
      item._id === id
        ? { ...item, qty: (item.qty || 1) + 1 }
        : item
    );

    setCart(updatedCart);
  };

  // Decrease quantity
  const decreaseQty = (id) => {

    const updatedCart = cart.map(item =>
      item._id === id && (item.qty || 1) > 1
        ? { ...item, qty: item.qty - 1 }
        : item
    );

    setCart(updatedCart);
  };

  // Sum of all product rent prices
  const totalCost = cart.reduce(
    (sum, item) => sum + item.rentPrice * (item.qty || 1),
    0
  );

  return (

    <div style={{maxWidth:"900px", margin:"40px auto", padding:"20px"}}>

      <h2 style={{textAlign:"center", marginBottom:"30px"}}>Your Cart</h2>

      {cart.length === 0 ? (
        <p style={{textAlign:"center"}}>No items in cart</p>
      ) : (
        <>
        
        {cart.map(item => (

          <div
            key={item._id}
            style={{
              display:"flex",
              alignItems:"center",
              gap:"20px",
              border:"1px solid #ddd",
              padding:"15px",
              marginBottom:"15px",
              borderRadius:"8px",
              boxShadow:"0 2px 6px rgba(0,0,0,0.1)"
            }}
          >

            <img
              src={item.image}
              alt={item.name}
              style={{
                width:"120px",
                height:"100px",
                objectFit:"cover",
                borderRadius:"6px"
              }}
            />

            <div style={{flex:1}}>
              <h3>{item.name}</h3>
              <p>₹{item.rentPrice} / month</p>

              {/* Quantity Buttons */}
              <div style={{display:"flex",alignItems:"center",gap:"10px"}}>

                <button onClick={() => decreaseQty(item._id)}>
                  -
                </button>

                <span>{item.qty || 1}</span>

                <button onClick={() => increaseQty(item._id)}>
                  +
                </button>

              </div>

            </div>

            <button
              onClick={() => removeFromCart(item._id)}
              style={{
                padding:"8px 14px",
                background:"red",
                color:"white",
                border:"none",
                borderRadius:"5px",
                cursor:"pointer"
              }}
            >
              Remove
            </button>

          </div>

        ))}

        {/* TOTAL SECTION */}
        <div
          style={{
            marginTop:"30px",
            padding:"15px",
            borderTop:"2px solid #ddd",
            textAlign:"right",
            fontSize:"20px",
            fontWeight:"bold"
          }}
        >
          Total Monthly Rent: ₹{totalCost}

          </div>
          <div>
<button
  style={{
    marginTop: "15px",
    padding: "12px 20px",
    background: "green",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px"
  }}
  onClick={() => navigate("/checkout")}
>
  Proceed to Checkout
</button>
        </div>

        </>
      )}

      <div style={{textAlign:"center", marginTop:"40px"}}>
        <Link to="/">
          <button
            style={{
              padding:"12px 20px",
              background:"maroon",
              color:"white",
              border:"none",
              borderRadius:"6px",
              cursor:"pointer"
            }}
          >
            ← Back to Home
          </button>
        </Link>
      </div>

    </div>

  );

}

export default Cart;