import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function Login() {
  const backendURL = "https://furniturerentalproject.onrender.com";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const loginUser = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        `${backendURL}/api/auth/login`,
        {
          email,
          password
        }
      );

      localStorage.setItem("token", res.data.token);

      // store user in context
      login(res.data.user);

      alert("Login successful");

      // redirect based on role
      if(res.data.user.isAdmin){
        navigate("/admin");
      }else{
        navigate("/");
      }

    } catch (error) {

      alert("Invalid login credentials");

    }

  };

  return (

    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "80vh",
      background: "#f5f5f5"
    }}>

      <div style={{
        width: "420px",
        padding: "40px",
        background: "white",
        borderRadius: "10px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.15)"
      }}>

        <h2 style={{
          textAlign: "center",
          marginBottom: "25px",
          color: "maroon"
        }}>
          Login
        </h2>

        <form onSubmit={loginUser}>

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
            placeholder="Enter your password"
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
            Login
          </button>

        </form>

        <p style={{
          textAlign:"center",
          marginTop:"18px",
          fontSize:"15px"
        }}>
          New user? <Link to="/register">Register here</Link>
        </p>

      </div>

    </div>

  );

}

export default Login;