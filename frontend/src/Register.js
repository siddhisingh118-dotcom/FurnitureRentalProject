import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://furniture-rental-project-dg9ur9tch.vercel.app/api/auth/register",
        {
          name,
          email,
          password
        }
      );

      alert("Registration successful. Please login.");

      window.location.href = "/login";

    } catch (error) {

      alert("Registration failed");

    }

  };

  return (

    <div style={{
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      height:"80vh",
      background:"#f5f5f5"
    }}>

      <div style={{
        width:"420px",
        padding:"40px",
        background:"white",
        borderRadius:"10px",
        boxShadow:"0 8px 20px rgba(0,0,0,0.15)"
      }}>

        <h2 style={{
          textAlign:"center",
          marginBottom:"25px",
          color:"maroon"
        }}>
          Register
        </h2>

        <form onSubmit={registerUser}>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
            style={{
              width:"100%",
              padding:"14px",
              fontSize:"16px",
              marginBottom:"15px",
              borderRadius:"6px",
              border:"1px solid #ccc"
            }}
          />

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
            style={{
              width:"100%",
              padding:"14px",
              fontSize:"16px",
              marginBottom:"15px",
              borderRadius:"6px",
              border:"1px solid #ccc"
            }}
          />

          <input
            type="password"
            placeholder="Create password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
            style={{
              width:"100%",
              padding:"14px",
              fontSize:"16px",
              marginBottom:"20px",
              borderRadius:"6px",
              border:"1px solid #ccc"
            }}
          />

          <button
            type="submit"
            style={{
              width:"100%",
              padding:"14px",
              fontSize:"16px",
              background:"maroon",
              color:"white",
              border:"none",
              borderRadius:"6px",
              cursor:"pointer"
            }}
          >
            Register
          </button>

        </form>

        <p style={{
          textAlign:"center",
          marginTop:"18px",
          fontSize:"15px"
        }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>

      </div>

    </div>

  );

}

export default Register;