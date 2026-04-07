import React from "react";

function About() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>

      {/* HERO SECTION */}
      <div
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1505691938895-1758d7feb511')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center"
        }}
      >
        <div style={{ background: "rgba(162, 8, 8, 0.5)", padding: "40px", borderRadius: "10px" }}>
          <h1 style={{ fontSize: "48px", marginBottom: "10px" }}>
            About RentEase
          </h1>
          <p style={{ fontSize: "20px" }}>
            Smart Furniture & Appliance Rentals for Modern Living
          </p>
        </div>
      </div>

      {/* STORY SECTION */}
      <div
        style={{
          padding: "60px 20px",
          maxWidth: "1100px",
          margin: "auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "40px",
          alignItems: "center"
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1556911220-bff31c812dba"
          alt="home"
          style={{
            width: "100%",
            borderRadius: "12px",
            boxShadow: "0 10px 20px rgba(0,0,0,0.2)"
          }}
        />

        <div>
          <h2 style={{ fontSize: "32px", marginBottom: "20px" }}>
            Our Vision
          </h2>

          <p style={{ fontSize: "18px", lineHeight: "1.7" }}>
            RentEase was created to help people access high-quality furniture
            and appliances without the burden of ownership.
          </p>

          <p style={{ fontSize: "18px", lineHeight: "1.7" }}>
            Whether you are moving to a new city, setting up a temporary home,
            or simply prefer flexibility, RentEase makes it easy to rent
            everything you need.
          </p>
        </div>
      </div>

      {/* FEATURES */}
      <div style={{ background: "#f6f8fb", padding: "70px 20px" }}>

        <h2 style={{ textAlign: "center", marginBottom: "50px", fontSize: "32px" }}>
          Why Choose RentEase?
        </h2>

        <div
          style={{
            maxWidth: "1100px",
            margin: "auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px,1fr))",
            gap: "30px"
          }}
        >

          <div style={cardStyle}>
            <h3>💰 Affordable Rentals</h3>
            <p>Access premium furniture and appliances at low monthly prices.</p>
          </div>

          <div style={cardStyle}>
            <h3>📦 Flexible Plans</h3>
            <p>Choose rental durations that suit your needs and lifestyle.</p>
          </div>

          <div style={cardStyle}>
            <h3>🏠 Wide Product Range</h3>
            <p>Beds, sofas, TVs, refrigerators, washing machines and more.</p>
          </div>

          <div style={cardStyle}>
            <h3>🚚 Easy Delivery</h3>
            <p>Quick delivery and installation directly to your home.</p>
          </div>

        </div>
      </div>

      {/* STATS SECTION */}
      <div
        style={{
          padding: "70px 20px",
          background: "#222",
          color: "white"
        }}
      >
        <div
          style={{
            maxWidth: "1000px",
            margin: "auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))",
            textAlign: "center",
            gap: "30px"
          }}
        >

          <div>
            <h1>500+</h1>
            <p>Happy Customers</p>
          </div>

          <div>
            <h1>120+</h1>
            <p>Products Available</p>
          </div>

          <div>
            <h1>20+</h1>
            <p>Cities Served</p>
          </div>

          <div>
            <h1>24/7</h1>
            <p>Support</p>
          </div>

        </div>
      </div>

      {/* CTA SECTION */}
      <div
        style={{
          padding: "60px 20px",
          textAlign: "center"
        }}
      >
        <h2 style={{ fontSize: "32px", marginBottom: "20px" }}>
          Ready to Furnish Your Home?
        </h2>

        <p style={{ fontSize: "18px", marginBottom: "30px" }}>
          Browse our collection of furniture and appliances today.
        </p>

        <a href="/#products">
  <button
    style={{
      padding: "12px 25px",
      fontSize: "16px",
      background: "maroon",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer"
    }}
  >
    Explore Products
  </button>
</a>
      </div>

      {/* FOOTER */}
      <div
        style={{
          padding: "30px",
          textAlign: "center",
          background: "#111",
          color: "#aaa"
        }}
      >
        <p>© 2026 RentEase — Furniture & Appliance Rentals</p>
      </div>

    </div>
  );
}

const cardStyle = {
  background: "white",
  padding: "30px",
  borderRadius: "12px",
  boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
  textAlign: "center"
};

export default About;