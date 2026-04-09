import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ProductDetails() {
  const backendURL ="https://furniturerentalproject.onrender.com";
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  

useEffect(() => {
  axios.get(`${backendURL}/api/products/${id}`)
    .then(res => setProduct(res.data))
    .catch(err => setProduct("notfound"));
}, [id, backendURL]);

  if (product === null) {
    return <h2 style={{textAlign:"center"}}>Loading product...</h2>;
  }

  if (product === "notfound") {
    return <h2 style={{textAlign:"center"}}>Product not found</h2>;
  }

  return (
    <div style={{maxWidth:"1100px", margin:"40px auto", padding:"20px"}}>

      <div style={{
        display:"grid",
        gridTemplateColumns:"1fr 1fr",
        gap:"40px",
        alignItems:"center"
      }}>

        <img
          src={product.image}
          alt={product.name}
          style={{
            width:"100%",
            borderRadius:"10px",
            boxShadow:"0 6px 15px rgba(0,0,0,0.2)"
          }}
        />

        <div>

          <h1>{product.name}</h1>

          <p style={{fontSize:"18px", margin:"20px 0"}}>
            {product.description}
          </p>

          <h2 style={{color:"maroon"}}>
            ₹{product.rentPrice} / month
          </h2>

          <div style={{marginTop:"10px"}}>
            <strong>Category:</strong> {product.category}
          </div>

          <div>
            <strong>Security Deposit:</strong> ₹{product.securityDeposit}
          </div>

          <div>
            <strong>Rental Tenure:</strong> {product.rentalTenureOptions.join(", ")} months
          </div>

          <button
            style={{
              marginTop:"20px",
              padding:"12px 20px",
              background:"maroon",
              color:"white",
              border:"none",
              borderRadius:"6px",
              cursor:"pointer"
            }}
          >
            Rent Now
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;