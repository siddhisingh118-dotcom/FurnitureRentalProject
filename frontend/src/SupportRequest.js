import React, { useState } from "react";
import axios from "axios";

function SupportRequest({ booking }) {

  const [issue, setIssue] = useState("");

  const submitRequest = async () => {

    try {

      await axios.post("http://localhost:5000/api/support/add", {

        userId: booking.userId,
        userName: booking.userName,

        productId: booking.productId,
        productName: booking.productName,
        productImage: booking.productImage,

        message: issue

      });

      alert("Support request submitted");

      setIssue("");

    } catch (error) {

      console.log(error);
      alert("Error submitting request");

    }

  };

  return (

    <div>

      <h3>Maintenance / Support</h3>

      <textarea
        placeholder="Describe the issue"
        value={issue}
        onChange={(e)=>setIssue(e.target.value)}
        style={{width:"100%",height:"80px"}}
      />

      <button onClick={submitRequest}>
        Submit Request
      </button>

    </div>

  );

}

export default SupportRequest;