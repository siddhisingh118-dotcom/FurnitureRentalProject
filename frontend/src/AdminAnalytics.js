import React, { useEffect, useState } from "react";
import axios from "axios";
import ChartDataLabels from "chartjs-plugin-datalabels";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

function AdminAnalytics() {
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  const [chartData, setChartData] = useState({});
  const [categoryData, setCategoryData] = useState({});
  const [topProducts, setTopProducts] = useState({});

  const fetchBookings = async () => {

    try {

      const res = await axios.get(`${backendURL}/api/admin/bookings`);
      const bookings = res.data;

      // ================= TOP RENTED PRODUCTS =================
      const productCounts = {};

      bookings.forEach(b => {
        const name = b.productName || "Unknown";
        productCounts[name] = (productCounts[name] || 0) + 1;
      });

      const sortedProducts = Object.entries(productCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

      setTopProducts({
        labels: sortedProducts.map(p => p[0]),
        datasets: [
          {
            label: "Top Rented",
            data: sortedProducts.map(p => p[1]),
            backgroundColor: "rgba(153,102,255,0.6)"
          }
        ]
      });

      // ================= MONTHLY =================
      const monthCounts = {
        Jan:0, Feb:0, Mar:0, Apr:0, May:0, Jun:0,
        Jul:0, Aug:0, Sep:0, Oct:0, Nov:0, Dec:0
      };

      bookings.forEach(b => {
        const month = new Date(b.bookingDate)
          .toLocaleString("default",{month:"short"});
        monthCounts[month]++;
      });

      setChartData({
        labels: Object.keys(monthCounts),
        datasets: [
          {
            label: "Bookings",
            data: Object.values(monthCounts),
            backgroundColor: "rgba(75,192,192,0.6)"
          }
        ]
      });

      // ================= CATEGORY =================
      const categoryCounts = {};

      bookings.forEach(b => {
        const cat = b.productId?.category || "Other";
        categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
      });

      setCategoryData({
        labels: Object.keys(categoryCounts),
        datasets: [
          {
            data: Object.values(categoryCounts),
            backgroundColor: [
              "#FF0000",
              "#007BFF"
            ]
          }
        ]
      });

    } catch (err) {
      console.log(err);
    }

  };

useEffect(() => {
  fetchBookings();
  // eslint-disable-next-line
}, []);

  const cardStyle = {
    width: "48%",
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  };

  return (

    <>
      {/* TOP ROW */}
      <div style={{
        display:"flex",
        gap:"20px",
        marginTop:"30px"
      }}>

        {/* BOOKING ANALYTICS */}
        <div style={cardStyle}>
          <h2 style={{textAlign:"center"}}>
            Booking Analytics
          </h2>

          {chartData.labels && <Bar data={chartData} />}
        </div>

        {/* CATEGORY SPLIT */}
        <div style={cardStyle}>
          <h2 style={{textAlign:"center"}}>
            Category Split
          </h2>

          {categoryData.labels && (
            <div style={{ width: "220px", margin: "0 auto" }}>
              <Doughnut
                data={categoryData}
                options={{
                  plugins: {
                    legend: {
                      position: "bottom"
                    },
                    datalabels: {
                      color: "#fff",
                      font: {
                        weight: "bold",
                        size: 14
                      },
                      formatter: (value, context) => {
                        const data = context.chart.data.datasets[0].data;
                        const total = data.reduce((a, b) => a + b, 0);
                        const percentage = ((value / total) * 100).toFixed(0) + "%";
                        return percentage;
                      }
                    }
                  }
                }}
              />
            </div>
          )}
        </div>

      </div>

      {/* TOP RENTED PRODUCTS */}
      <div style={{
        width:"100%",
        background:"#fff",
        padding:"20px",
        borderRadius:"10px",
        boxShadow:"0 2px 8px rgba(0,0,0,0.1)",
        marginTop:"20px"
      }}>
        <h2 style={{textAlign:"center"}}>
          Top Rented Products
        </h2>

        {topProducts.labels && <Bar data={topProducts} />}
      </div>

    </>

  );

}

export default AdminAnalytics;