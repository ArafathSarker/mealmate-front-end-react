import React, { useEffect,useState } from 'react';
import { Helmet } from "react-helmet";
import {useNavigate } from 'react-router-dom';
import { IoLogOut } from "react-icons/io5";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
export default function Dashboard() {
  const navigate = useNavigate();
  const [groupValues, setgroupValues] = useState({
    totalCost: 0,
    totalDeposit: 0,
    totalMeal: 0,
    mealRate:0,
  });
  const [groupUserValues, setgroupUserValues] = useState({
    due: 0,
    refund: 0,
    numberofMeal: 0,
    totalConsumed:0,
    deposit:0,
  });
  useEffect(() => {
    const token = localStorage.getItem("Authorization");
    const name = localStorage.getItem("UserName");
    (async () => {
      try {
        const res = await fetch(import.meta.env.VITE_API_LINK +"dashboard", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
          }
        });
        await res.json();
        const groupres = await fetch(import.meta.env.VITE_API_LINK +"data/group", {
          method: "post",
          headers: {
            'Content-Type': 'application/json',
          },
          body:JSON.stringify({
            name
          })
        });
       const groupData = await groupres.json();
       setgroupValues(groupData);
       const groupUserres = await fetch(import.meta.env.VITE_API_LINK +"data/groupuser", {
        method: "post",
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({
          name
        })
      });
     const groupUserData = await groupUserres.json();
          
           setgroupUserValues(groupUserData);
          
      } 
      catch (err) {
        console.error("Redirecting due to error:", err.message);
        navigate('/login');
      }
    })();
  }, []);
//giving the loggingout function
const handlelogout = ()=>{
  localStorage.removeItem("Authorization");
  localStorage.removeItem("UserName");
  navigate('/login');
  window.location.reload();
}
  return (
    <>
    
      <Helmet>
        <title>MealMate Dashboard</title>
        <link rel="icon" type="image/png" href="/logo192.png" />
      </Helmet>

    <IoLogOut className='logout' onClick={handlelogout}/>
    <div className='dash-div'>
       <h1 className='dashboard'>Dashboard</h1>
      <div className='dash-div-all'>
      <section className='dash-sec'>
        <h2>Total Cost</h2>
        <span>{groupValues.totalCost} <FaBangladeshiTakaSign/></span>
      </section >
      <section className='dash-sec'>
        <h2>Total Deposit</h2>
        <span>{groupValues.totalDeposit}<FaBangladeshiTakaSign/></span>
      </section>
      <section className='dash-sec'>
        <h2>Total Meal</h2>
        <span>{groupValues.totalMeal}</span>
      </section >
      </div>
     <div className='dash-div-all'>
     <section className='dash-sec'>
        <h2>Total Due</h2>
        <span>{groupUserValues.due} <FaBangladeshiTakaSign/></span>
      </section>
      <section className='dash-sec'>
        <h2>Pending Amount</h2>
        <span>{groupUserValues.refund} <FaBangladeshiTakaSign/></span>
      </section>
      <section className='dash-sec'>
        <h2>Meal</h2>
        <span>{groupUserValues.numberofMeal}</span>
      </section>
     </div>
     <div className='dash-div-all'>
     <section className='dash-sec'>
        <h2>Your Deposite</h2>
        <span>{groupUserValues.deposit}<FaBangladeshiTakaSign/></span>
      </section>
      <section className='dash-sec'>
        <h2>Total Consumed</h2>
        <span>{groupUserValues.totalConsumed} <FaBangladeshiTakaSign/></span>
      </section >
      <section className='dash-sec'>
        <h2>Mealrate</h2>
        <span>{groupValues.mealRate}<FaBangladeshiTakaSign/></span>
      </section>
      </div>
    </div>
    </>
    
  );
}
