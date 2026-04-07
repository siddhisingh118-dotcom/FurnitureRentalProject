import React, { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Checkout() {

  const { cart, setCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");

  const totalCost = cart.reduce((sum, item) => sum + item.rentPrice, 0);

  const placeOrder = async () => {

    if (!deliveryAddress || !deliveryDate) {
      alert("Please enter delivery address and date");
      return;
    }

    if (!user) {
      alert("Please login first");
      return;
    }

    try {

      for (let item of cart) {
        const productId = item._id || item.id;

        const bookingData = {
          userName: user.name,
          userId: user._id,

          productId: productId,
          productName: item.name,
          productImage: item.image,
          rentPrice: item.rentPrice,

          rentalDuration: 1,
          securityDeposit: item.rentPrice * 2,
          totalPrice: item.rentPrice * 3,

          deliveryAddress: deliveryAddress,
          deliveryDate: deliveryDate
        };

        await axios.post(
          "http://localhost:5000/api/bookings/add",
          bookingData
        );

      }

      alert("Booking Successful!");
      navigate("/payment", {
  state: {
    deliveryAddress,
    deliveryDate
  }
});

    } catch (error) {

      console.error("Booking Error:", error.response || error);

      alert("Booking Failed");

    }

  };

  return (

    <div style={{maxWidth:"800px", margin:"40px auto"}}>

      <h2 style={{textAlign:"center"}}>Checkout</h2>

      {cart.map(item => (
        <div
          key={item._id}
          style={{
            display:"flex",
            gap:"20px",
            margin:"15px 0",
            border:"1px solid #ddd",
            padding:"10px",
            borderRadius:"6px",
            alignItems:"center"
          }}
        >

          <img
            src={item.image}
            alt={item.name}
            width="90"
            style={{borderRadius:"6px"}}
          />

          <div>
            <h4>{item.name}</h4>
            <p>₹{item.rentPrice}/month</p>
          </div>

        </div>
      ))}

      <div style={{marginTop:"20px"}}>
        <label><b>Delivery Address</b></label>

        <textarea
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
          placeholder="Enter delivery address"
          style={{
            width:"100%",
            padding:"10px",
            marginTop:"5px",
            borderRadius:"6px",
            border:"1px solid #ccc"
          }}
        />
      </div>

      <div style={{marginTop:"20px"}}>
        <label><b>Select Delivery Date</b></label>

        <input
          type="date"
          value={deliveryDate}
          onChange={(e) => setDeliveryDate(e.target.value)}
          style={{
            width:"100%",
            padding:"10px",
            marginTop:"5px",
            borderRadius:"6px",
            border:"1px solid #ccc"
          }}
        />
      </div>

      <h3 style={{marginTop:"20px"}}>Total: ₹{totalCost}</h3>

      <button
        onClick={placeOrder}
        style={{
          marginTop:"20px",
          padding:"12px 20px",
          background:"maroon",
          color:"white",
          border:"none",
          borderRadius:"6px",
          cursor:"pointer",
          fontSize:"16px"
        }}
      >
        Confirm Booking
      </button>

    </div>

  );

}

export default Checkout;
