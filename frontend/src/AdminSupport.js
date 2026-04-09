import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminSupport() {
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  const [requests, setRequests] = useState([]);
  const [replyText, setReplyText] = useState({});

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${backendURL}/api/support`);
      setRequests(res.data || []);
    } catch (err) {
      console.error("Error fetching support requests:", err);
      setRequests([]);
    }
  };

// eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
  fetchRequests();
}, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${backendURL}/api/support/${id}`, {
        requestStatus: status
      });
      fetchRequests();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  //  SEND ADMIN REPLY
  const sendReply = async (id) => {
    try {

      await axios.put(`${backendURL}/api/support/reply/${id}`, {
        adminReply: replyText[id]
      });

      setReplyText({ ...replyText, [id]: "" });

      fetchRequests();

    } catch (err) {
      console.error("Reply error:", err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Resolved":
        return "green";
      case "In Progress":
        return "orange";
      default:
        return "gray";
    }
  };

  return (
    <div style={{
      padding: "40px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>

      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
        Support Requests
      </h2>

      {requests.length === 0 ? (
        <p>No support requests found.</p>
      ) : (
        requests.map((req) => (

          <div
            key={req._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              marginBottom: "20px",
              width: "100%",
              maxWidth: "700px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              backgroundColor: "#fff",
            }}
          >

            {/* PRODUCT IMAGE */}
            {req.productImage && (
              <img
                src={req.productImage}
                alt={req.productName}
                style={{
                  width: "120px",
                  borderRadius: "8px",
                  marginBottom: "10px"
                }}
              />
            )}

            <h3>{req.productName}</h3>

            <p><b>User:</b> {req.userName}</p>

            <p><b>Issue:</b> {req.message}</p>

            {/* SHOW ADMIN REPLY */}
            <p>
              <b>Admin Reply:</b>{" "}
              {req.adminReply ? req.adminReply : "No reply yet"}
            </p>

            <p>
              <b>Status:</b>{" "}
              <span
                style={{
                  color: getStatusColor(req.requestStatus || req.status),
                  fontWeight: "bold"
                }}
              >
                {req.requestStatus || req.status}
              </span>
            </p>

            <p>
              <b>Date:</b> {new Date(req.requestDate).toLocaleString()}
            </p>

            {/* STATUS BUTTONS */}
            <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>

              <button
                onClick={() => updateStatus(req._id, "In Progress")}
                style={{
                  background: "orange",
                  color: "white",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                In Progress
              </button>

              <button
                onClick={() => updateStatus(req._id, "Resolved")}
                style={{
                  background: "green",
                  color: "white",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Resolved
              </button>

            </div>

            {/* ADMIN REPLY INPUT */}
            <div style={{ marginTop: "15px" }}>

              <input
                type="text"
                placeholder="Write admin reply..."
                value={replyText[req._id] || ""}
                onChange={(e) =>
                  setReplyText({
                    ...replyText,
                    [req._id]: e.target.value
                  })
                }
                style={{
                  padding: "8px",
                  width: "70%",
                  borderRadius: "5px",
                  border: "1px solid #ccc"
                }}
              />

              <button
                onClick={() => sendReply(req._id)}
                style={{
                  marginLeft: "10px",
                  padding: "8px 16px",
                  background: "blue",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                Send Reply
              </button>

            </div>

          </div>

        ))
      )}

    </div>
  );
}

export default AdminSupport;