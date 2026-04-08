import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Bookings() {

  const [bookings, setBookings] = useState([]);
  const [supportRequests, setSupportRequests] = useState([]);

  const fetchBookings = () => {

    axios.get("https://furniture-rental-project-dg9ur9tch.vercel.app/api/bookings")
      .then(res => {
        setBookings(res.data);
      })
      .catch(err => {
        console.log(err);
      });

  };

  useEffect(() => {
    fetchBookings();
    fetchSupportRequests();
  }, []);

  const fetchSupportRequests = () => {

    axios.get("https://furniture-rental-project-dg9ur9tch.vercel.app/api/support")
      .then(res => {
        setSupportRequests(res.data);
      })
      .catch(err => console.log(err));

  };

  const updateDuration = (id, months) => {

    axios.put(`https://furniture-rental-project-dg9ur9tch.vercel.app/api/bookings/update/${id}`, {
      rentalDuration: months
    })
      .then(() => {
        fetchBookings();
      })
      .catch(err => console.log(err));

  };

  //  NEW SUPPORT REQUEST FUNCTION
  const requestSupport = (booking) => {

    const message = prompt("Describe the issue:");

    if (!message) return;

    axios.post("https://furniture-rental-project-dg9ur9tch.vercel.app/api/support/add", {
      bookingId: booking._id,
      userName: booking.userName,
      productName: booking.productName,
      message: message
    })
      .then(() => {
        alert("Support request submitted!");
      })
      .catch(err => console.log(err));

  };

  //  NEW: Schedule Pickup Function
  const schedulePickup = (booking) => {

    const date = prompt("Enter Pickup Date (YYYY-MM-DD):");

    if (!date) return;

    axios.put(`https://furniture-rental-project-dg9ur9tch.vercel.app/api/bookings/schedule-pickup/${booking._id}`, {
      pickupDate: date
    })
      .then(() => {
        alert("Pickup scheduled!");
        fetchBookings();
      })
      .catch(err => console.log(err));

  };

  const requestReturn = (booking) => {

  axios.put(`https://furniture-rental-project-dg9ur9tch.vercel.app/api/bookings/request-return/${booking._id}`)
    .then(() => {
      alert("Return requested!");
      fetchBookings();
    })
    .catch(err => console.log(err));

};

  return (

    <div style={{ padding: "40px" }}>

      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
        My Bookings
      </h2>

      {bookings.map((booking) => (

        <div
          key={booking._id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "20px",
            marginBottom: "20px",
            width: "700px",
            marginLeft: "auto",
            marginRight: "auto",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >

          {/* LEFT SIDE */}
          <div>

            <h4>{booking.productName}</h4>

            <p>Rent: ₹{booking.rentPrice} / month</p>

            <p>Rental Duration: {booking.rentalDuration || 1} month(s)</p>

            <p>Security Deposit: ₹{booking.securityDeposit || 0}</p>

            <p>Total Price: ₹{booking.totalPrice || booking.rentPrice}</p>

            <p>
              Delivery Date: {booking.deliveryDate
                ? new Date(booking.deliveryDate).toDateString()
                : "Not scheduled"}
            </p>

            {/*  NEW: Pickup Date */}
            <p>
              Pickup Date: {booking.pickupDate
                ? new Date(booking.pickupDate).toDateString()
                : "Not scheduled"}
            </p>

            <p>Status: {booking.bookingStatus || "Confirmed"}</p>
            <p>
  Return Status: {booking.returnRequested
    ? (booking.returnApproved ? "Approved" : "Requested")
    : "Not Requested"}
</p>

{/* BOOKING TIMELINE */}
<div style={{ marginTop: "10px", fontWeight: "500" }}>

  <span style={{
    color: booking.bookingStatus === "Booked" ? "#8B0000" : "#bbb",
    fontWeight: booking.bookingStatus === "Booked" ? "bold" : "normal"
  }}>
    Booked
  </span>

  <span> → </span>

  <span style={{
    color: booking.bookingStatus === "Preparing" ? "#8B0000" : "#bbb",
    fontWeight: booking.bookingStatus === "Preparing" ? "bold" : "normal"
  }}>
    Preparing
  </span>

  <span> → </span>

  <span style={{
    color: booking.bookingStatus === "Out for Delivery" ? "#8B0000" : "#bbb",
    fontWeight: booking.bookingStatus === "Out for Delivery" ? "bold" : "normal"
  }}>
    Out for Delivery
  </span>

  <span> → </span>

  <span style={{
    color: booking.bookingStatus === "Delivered" ? "#8B0000" : "#bbb",
    fontWeight: booking.bookingStatus === "Delivered" ? "bold" : "normal"
  }}>
    Delivered
  </span>

</div>

            <p>
              Booked On: {new Date(booking.bookingDate).toDateString()}
            </p>

            <div>

              <p>Select Rental Duration:</p>

              <button onClick={() => updateDuration(booking._id, 3)}>
                3 Months
              </button>

              <button
                onClick={() => updateDuration(booking._id, 6)}
                style={{ marginLeft: "10px" }}
              >
                6 Months
              </button>

              <button
                onClick={() => updateDuration(booking._id, 12)}
                style={{ marginLeft: "10px" }}
              >
                12 Months
              </button>

            </div>

            {/*  MAINTENANCE BUTTON */}
            <div style={{ marginTop: "15px" }}>
              <button
                onClick={() => requestSupport(booking)}
                style={{
                  background: "orange",
                  border: "none",
                  padding: "8px 15px",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                Request Maintenance
              </button>
            </div>

            {/*  NEW: Schedule Pickup Button */}
            <div style={{ marginTop: "10px" }}>
              <button
                onClick={() => schedulePickup(booking)}
                style={{
                  background: "#4CAF50",
                  border: "none",
                  padding: "8px 15px",
                  borderRadius: "5px",
                  color: "white",
                  cursor: "pointer"
                }}
              >
                Schedule Pickup
              </button>
            </div>


          <div style={{ marginTop: "10px" }}>
  <button
    onClick={() => requestReturn(booking)}
    style={{
      background: "red",
      border: "none",
      padding: "8px 15px",
      borderRadius: "5px",
      color: "white",
      cursor: "pointer"
    }}
  >
    Request Return
  </button>
</div>
</div>

          {/* SUPPORT REQUESTS FOR THIS BOOKING */}

{supportRequests
  .filter(req => req.productName === booking.productName)
  .map(req => (

    <div
      key={req._id}
      style={{
        marginTop: "15px",
        padding: "10px",
        border: "1px solid #eee",
        borderRadius: "5px",
        background: "#f9f9f9"
      }}
    >

      <p><b>Issue:</b> {req.message}</p>

      <p>
        <b>Admin Reply:</b> {req.adminReply || "Support team will respond soon"}
      </p>

      <p>
        <b>Status:</b> {req.requestStatus}
      </p>

    </div>

))}

          {/* RIGHT SIDE IMAGE */}
          <div>

            <img
              src={booking.productImage || "https://via.placeholder.com/150"}
              alt={booking.productName}
              style={{
                width: "150px",
                height: "120px",
                objectFit: "cover",
                borderRadius: "8px"
              }}
            />

          </div>

        </div>

      ))}

      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <Link to="/">
          <button
            style={{
              background: "#8B0000",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Continue Shopping
          </button>
        </Link>
      </div>

    </div>

  );

}

export default Bookings;