import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSupport from "./AdminSupport";
import AdminAnalytics from "./AdminAnalytics";

export default function Admin() {
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  const [tab, setTab] = useState("dashboard");

  const [stats, setStats] = useState({});
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Furniture");
  const [rentPrice, setRentPrice] = useState("");
  const [securityDeposit, setSecurityDeposit] = useState("");
  const [image, setImage] = useState("");
  const [bookings, setBookings] = useState([]);

  const fetchStats = async () => {
    const res = await axios.get(`${backendURL}/api/admin/stats`);
    setStats(res.data);
  };

  const fetchProducts = async () => {
    const res = await axios.get(`${backendURL}/api/products`);
    setProducts(res.data);
  };

  const fetchBookings = async () => {
    const res = await axios.get(`${backendURL}/api/admin/bookings`);
    setBookings(res.data);
  };

  const addProduct = async () => {
    if (!name || !rentPrice || !securityDeposit || !image) {
      return alert("All fields required");
    }

    await axios.post(`${backendURL}/api/products/add`, {
      name,
      category,
      rentPrice,
      securityDeposit,
      image
    });

    alert("Product Added");

    setName("");
    setRentPrice("");
    setSecurityDeposit("");
    setImage("");

    fetchProducts();
    fetchStats();
  };

  const deleteProduct = async (id) => {
    await axios.delete(`${backendURL}/api/products/${id}`);
    fetchProducts();
    fetchStats();
  };

  const updateBookingStatus = async (id, status) => {
    await axios.put(`${backendURL}/api/admin/bookings/${id}`, {
      bookingStatus: status
    });

    fetchBookings();
    fetchStats();
  };

  const approveReturn = async (id) => { 
    await axios.put(`${backendURL}/api/bookings/approve-return/${id}`);
    fetchBookings(); 
  }; 

  const completeBooking = async (id) => {
    await axios.put(`${backendURL}/api/bookings/complete/${id}`);
    fetchBookings();
  };

// eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
  fetchStats();
  fetchProducts();
  fetchBookings();
}, []);

  // ================= UI STYLES =================

  const containerStyle = {
    maxWidth: "1200px",
    margin: "auto",
    padding: "20px",
    fontFamily: "Arial"
  };

  const tabButton = (active) => ({
    padding: "10px 20px",
    marginRight: "10px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    background: active ? "maroon" : "#ddd",
    color: active ? "white" : "black"
  });

  const cardStyle = {
    background: "#fff",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  };

  const inputStyle = {
    padding: "8px",
    marginRight: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc"
  };

  const buttonStyle = {
    padding: "8px 15px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    background: "maroon",
    color: "white"
  };

const getStatusStyle = (status) => {
  switch (status) {
    case "Confirmed":
      return { background: "#2196F3", color: "white" };
    case "Pickup Scheduled":
      return { background: "#FF9800", color: "white" };
    case "Return Approved":
      return { background: "#9C27B0", color: "white" };
    case "Completed":
      return { background: "#4CAF50", color: "white" };
    default:
      return { background: "#ccc", color: "black" };
  }
};

  return (

    <div style={containerStyle}>

      <h1 style={{textAlign:"center"}}>Admin Panel</h1>

      {/* TABS */}

      <div style={{marginBottom:"30px"}}>

        <button style={tabButton(tab==="dashboard")} onClick={()=>setTab("dashboard")}>
          Dashboard
        </button>

        <button style={tabButton(tab==="products")} onClick={()=>setTab("products")}>
          Products
        </button>

        <button style={tabButton(tab==="bookings")} onClick={()=>setTab("bookings")}>
          Bookings
        </button>

        <button style={tabButton(tab==="support")} onClick={()=>setTab("support")}>
          Support
        </button>

      </div>

      {/* DASHBOARD */}

{tab==="dashboard" && (

  <div>

    {/* STATS CARDS */}
    <div style={{display:"flex",gap:"20px",marginBottom:"30px"}}>

      <div style={cardStyle}>
        <h3>Total Products</h3>
        <p>{stats.totalProducts}</p>
      </div>

      <div style={cardStyle}>
        <h3>Total Bookings</h3>
        <p>{stats.totalBookings}</p>
      </div>

      <div style={cardStyle}>
        <h3>Confirmed</h3>
        <p>{stats.confirmedBookings}</p>
      </div>

      <div style={cardStyle}>
        <h3>Delivered</h3>
        <p>{stats.deliveredBookings}</p>
      </div>

    </div>

    {/*  ANALYTICS CHART */}
    <AdminAnalytics />

  </div>

)}

      {/* PRODUCTS */}

      {tab==="products" && (

        <div>

          <h2>Manage Products</h2>

          <input style={inputStyle} placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />

          <select style={inputStyle} value={category} onChange={(e)=>setCategory(e.target.value)}>
            <option>Furniture</option>
            <option>Appliances</option>
          </select>

          <input style={inputStyle} placeholder="Rent Price" value={rentPrice} onChange={(e)=>setRentPrice(e.target.value)} />

          <input style={inputStyle} placeholder="Deposit" value={securityDeposit} onChange={(e)=>setSecurityDeposit(e.target.value)} />

          <input style={inputStyle} placeholder="Image URL" value={image} onChange={(e)=>setImage(e.target.value)} />

          <button style={buttonStyle} onClick={addProduct}>Add</button>

          <table style={{width:"100%",marginTop:"20px"}}>

            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Rent</th>
                <th>Deposit</th>
                <th>Availability</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {products.map(p=>(
                <tr key={p._id}>
                    <td>
    <img
      src={p.image}
      alt={p.name}
      style={{
        width: "60px",
        height: "50px",
        objectFit: "cover",
        borderRadius: "5px"
      }}
    />
  </td>
                  <td>{p.name}</td>
                  <td>{p.category}</td>
                  <td>₹{p.rentPrice}</td>
                  <td>₹{p.securityDeposit}</td>

<td>
  <span
    style={{
      padding: "5px 10px",
      borderRadius: "6px",
      fontWeight: "bold",
      background: p.isAvailable ? "#4CAF50" : "#f44336",
      color: "white"
    }}
  >
    {p.isAvailable ? "Available" : "Out of Stock"}
  </span>
</td>

                  <td>
                    <button
                      style={{...buttonStyle,background:"red"}}
                      onClick={()=>deleteProduct(p._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>

      )}
      
{/* BOOKINGS */}

{tab === "bookings" && (
  <div>

    <h2>Bookings</h2>

    <table style={{width:"100%",borderCollapse:"collapse",marginTop:"20px"}}>

      <thead style={{background:"#eee"}}>
        <tr>
          <th style={{padding:"10px"}}>User</th>
          <th>Product</th>
          <th>Status</th>
          <th>Pickup Date</th>
          <th>Return Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>

        {bookings.map((b)=>(
          <tr
            key={b._id}
            style={{
              textAlign:"center",
              borderBottom:"1px solid #ddd",
              background: b.returnRequested && !b.returnApproved ? "#fff3cd" : "white"
            }}
          >

            <td style={{padding:"10px"}}>{b.userName}</td>
            <td>{b.productName}</td>
<td>
  <span
    style={{
      padding: "5px 10px",
      borderRadius: "6px",
      fontWeight: "bold",
      ...getStatusStyle(b.bookingStatus)
    }}
  >
    {b.bookingStatus}
  </span>
</td>

            <td>
              {b.pickupDate
                ? new Date(b.pickupDate).toDateString()
                : "Not scheduled"}
            </td>

            <td>
              {b.returnRequested
                ? (b.returnApproved ? "Approved" : "Requested")
                : "No Request"}
            </td>

            <td>

              <button
                style={{marginRight:"10px",padding:"5px 10px"}}
                onClick={()=>updateBookingStatus(b._id,"Delivered")}
              >
                Delivered
              </button>

              <button
                style={{padding:"5px 10px"}}
                onClick={()=>updateBookingStatus(b._id,"Cancelled")}
              >
                Cancel
              </button>


{/* APPROVE PICKUP */}
<button
  disabled={b.bookingStatus !== "Confirmed"}
  onClick={() => updateBookingStatus(b._id, "Pickup Scheduled")}
  style={{
    marginLeft: "10px",
    padding: "5px 10px",
    background: b.bookingStatus === "Confirmed" ? "#4CAF50" : "gray",
    color: "white",
    cursor: b.bookingStatus === "Confirmed" ? "pointer" : "not-allowed"
  }}
>
  Approve Pickup
</button>

{/* APPROVE RETURN */}
<button
  disabled={!b.returnRequested || b.returnApproved}
  onClick={() => approveReturn(b._id)}
  style={{
    marginLeft: "5px",
    padding: "5px 10px",
    background: b.returnRequested && !b.returnApproved ? "orange" : "gray",
    color: "white",
    cursor: b.returnRequested && !b.returnApproved ? "pointer" : "not-allowed"
  }}
>
  Approve Return
</button>

{/* COMPLETE */}
<button
  disabled={b.bookingStatus === "Completed"}
  onClick={() => completeBooking(b._id)}
  style={{
    marginLeft: "5px",
    padding: "5px 10px",
    background: b.returnApproved ? "green" : "gray",
    color: "white",
    cursor: b.returnApproved ? "pointer" : "not-allowed"
  }}
>
  Complete
</button>


            </td>

          </tr>
        ))}

      </tbody>

    </table>

  </div>
)}

      {/* SUPPORT */}

      {tab==="support" && <AdminSupport />}

    </div>
  );
}