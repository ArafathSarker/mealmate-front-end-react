import React, { useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import { FaBangladeshiTakaSign } from "react-icons/fa6";
export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("Authorization");

    (async () => {
      try {
        const res = await fetch("http://127.0.0.1:3000/app/mealmate/api/dashboard", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
          }
        });
        await res.json();
        
      } 
      catch (err) {
        console.error("Redirecting due to error:", err.message);
        navigate('/login');
      }
    })();
  }, []);

  return (
    
    <div className='dash-div'>
      <h1 className='dashboard'>Dashboard</h1>
      <div className='dash-div1'>
      <section className='dash-sec'>
        <h2>Total Cost</h2>
        <span>0 <FaBangladeshiTakaSign/></span>
      </section >
      <section className='dash-sec'>
        <h2>Total Deposit</h2>
        <span>0 <FaBangladeshiTakaSign/></span>
      </section>
      </div>
     <div className='dash-div2'>
     <section className='dash-sec'>
        <h2>Total Due</h2>
        <span>0 <FaBangladeshiTakaSign/></span>
      </section>
      <section className='dash-sec'>
        <h2>Pending Amount</h2>
        <span>0 <FaBangladeshiTakaSign/></span>
      </section>
     </div>
     
    </div>
    
    
  );
}
