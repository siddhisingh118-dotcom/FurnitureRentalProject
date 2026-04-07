import React, {useEffect, useState} from "react";
import axios from "axios";

function Dashboard(){

 const [bookings, setBookings] = useState([]);

 useEffect(()=>{

   axios.get("http://localhost:5000/api/bookings")
   .then(res=>{
     setBookings(res.data);
   });

 },[]);

 return(

   <div>

     <h2>My Bookings</h2>

     {bookings.map(b => (

       <div key={b._id}>
         <p>User: {b.userName}</p>
         <p>Tenure: {b.tenure}</p>
       </div>

     ))}

   </div>

 );

}

export default Dashboard;