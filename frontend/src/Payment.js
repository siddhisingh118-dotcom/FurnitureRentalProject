import React, { useContext, useState } from "react";
import axios from "axios";
import { CartContext } from "./CartContext";
import { useNavigate, useLocation } from "react-router-dom";
import jsPDF from "jspdf";

function Payment() {
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const { cart, setCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [upiId, setUpiId] = useState("");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: ""
  });

  const navigate = useNavigate();
  const location = useLocation();

  const deliveryAddress = location.state?.deliveryAddress || "N/A";
  const deliveryDate = location.state?.deliveryDate || "N/A";

  // GROUP ITEMS
  const groupedItems = Object.values(
    cart.reduce((acc, item) => {
      const key = item._id || item.name;

      if (!acc[key]) {
        acc[key] = {
          ...item,
          qty: item.qty || 1
        };
      } else {
        acc[key].qty += item.qty || 1;
      }

      return acc;
    }, {})
  );

  // TOTAL
  const totalAmount = groupedItems.reduce(
    (acc, item) => acc + item.rentPrice * (item.qty || 1),
    0
  );

  // INVOICE
  const generateInvoice = (orderData) => {
    const doc = new jsPDF();

    doc.setFillColor(179, 0, 0);
    doc.rect(0, 0, 210, 30, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.text("RentEase", 20, 18);

    doc.setFontSize(10);
    doc.text("Furniture Rental Service", 140, 18);

    doc.setTextColor(0, 0, 0);

    doc.setFontSize(16);
    doc.text("INVOICE", 90, 45);

    doc.setFontSize(11);
    doc.text(`Order ID: ${orderData._id}`, 20, 60);
    doc.text(`Payment Method: ${orderData.paymentMethod}`, 20, 70);
    doc.text(`Status: ${orderData.paymentStatus}`, 20, 80);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 90);

    doc.text(`Delivery Address:`, 20, 105);
    doc.text(`${deliveryAddress}`, 20, 112);

    doc.text(`Delivery Date: ${deliveryDate}`, 20, 125);

    let y = 140;

    doc.setFillColor(200, 200, 200);
    doc.rect(20, y, 170, 10, "F");

    doc.text("No", 25, y + 7);
    doc.text("Item", 50, y + 7);
    doc.text("Qty", 120, y + 7);
    doc.text("Price (₹)", 150, y + 7);

    y += 15;

    let total = 0;

    groupedItems.forEach((item, index) => {
      const price = item.rentPrice || 0;
      const qty = item.qty || 1;
      const itemTotal = price * qty;

      doc.text(String(index + 1), 25, y);
      doc.text(String(item.name), 50, y);
      doc.text(String(qty), 120, y);
      doc.text(`₹${itemTotal}`, 150, y);

      total += itemTotal;
      y += 10;
    });

    doc.line(20, y, 190, y);

    y += 10;
    doc.setFontSize(13);
    doc.text(`Total Amount: ₹${total}`, 140, y);

    y += 20;
    doc.setFontSize(10);
    doc.text("Thank you for choosing RentEase!", 60, y);

    doc.save("RentEase_Invoice.pdf");
  };

  // PAYMENT
  const handlePayment = async () => {
    setLoading(true);

    setTimeout(async () => {
      try {
        const paymentStatus =
          selectedMethod === "COD" ? "Pending" : "Success";

        const res = await axios.post(
          `${backendURL}/api/orders`,
          {
            items: groupedItems,
            paymentMethod: selectedMethod,
            paymentStatus: paymentStatus
          }
        );

        generateInvoice(res.data.order);

        alert(
          selectedMethod === "COD"
            ? "Order Placed. Pay on Delivery ⏳"
            : "Payment Successful ✅"
        );

        setCart([]);
        navigate("/bookings");

      } catch (err) {
        alert("Payment Failed ❌");
      }

      setLoading(false);
    }, 1500);
  };

  const btnStyle = {
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#b30000",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold"
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "80vh",
      backgroundColor: "#f5f5f5"
    }}>
      <div style={{
        background: "white",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        width: "350px",
        textAlign: "center"
      }}>
        <h2>💳 Payment</h2>

        <h3>Total: ₹{totalAmount}</h3>

        {loading && <p>Processing Payment...</p>}

        <h4>Choose Method</h4>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <button onClick={() => setSelectedMethod("UPI")} style={btnStyle}>
            UPI
          </button>

          <button onClick={() => setSelectedMethod("CARD")} style={btnStyle}>
            Card
          </button>

          <button onClick={() => setSelectedMethod("COD")} style={btnStyle}>
            Cash on Delivery
          </button>
        </div>

        {/* UPI */}
        {selectedMethod === "UPI" && (
          <div style={{ marginTop: "15px" }}>
            <input
              type="text"
              placeholder="Enter UPI ID"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              style={{ padding: "8px", width: "100%" }}
            />
            <button
              style={{ ...btnStyle, marginTop: "10px" }}
              onClick={handlePayment}
            >
              Pay Now
            </button>
          </div>
        )}

        {/* CARD */}
        {selectedMethod === "CARD" && (
          <div style={{ marginTop: "15px", display: "flex", flexDirection: "column", gap: "8px" }}>
            <input
              placeholder="Card Number"
              onChange={(e) =>
                setCardDetails({ ...cardDetails, number: e.target.value })
              }
            />

            <input
              placeholder="Card Holder Name"
              onChange={(e) =>
                setCardDetails({ ...cardDetails, name: e.target.value })
              }
            />

            <input
              placeholder="Expiry MM/YY"
              onChange={(e) =>
                setCardDetails({ ...cardDetails, expiry: e.target.value })
              }
            />

            <input
              placeholder="CVV"
              onChange={(e) =>
                setCardDetails({ ...cardDetails, cvv: e.target.value })
              }
            />

            <button
              style={{ ...btnStyle, marginTop: "5px" }}
              onClick={handlePayment}
            >
              Pay Now
            </button>
          </div>
        )}

        {/* COD */}
        {selectedMethod === "COD" && (
          <button
            style={{ ...btnStyle, marginTop: "15px" }}
            onClick={handlePayment}
          >
            Place Order
          </button>
        )}

      </div>
    </div>
  );
}

export default Payment;