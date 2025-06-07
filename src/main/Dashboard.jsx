import React, { useEffect,useState } from 'react';
import { Helmet } from "react-helmet";
import {useNavigate } from 'react-router-dom';
import { IoLogOut } from "react-icons/io5";
import { CgLogOut } from "react-icons/cg";
import { GrPowerReset } from "react-icons/gr";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { MdModeEditOutline } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import LeaveGroup from './leavegroupconfirmation';
import ConfirmChangeName from './confirmchangename';
import ConfirmTotalDeposit from './confirmtotaldeposit';
import ConfirmTotalMeal from './confirmtotalmeal';
import ConfirmDue from './confirmdue';
import ConfirmRefund from './confirmrefund';
import ConfirmReset from './confirmreset';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Dashboard() {
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [showChange, setShowChange] = useState(false);
  const [showTotalDeposit, setShowTotalDeposit] = useState(false);
  const [showTotalMeal, setShowTotalMeal] = useState(false);
  const [showDue, setShowDue] = useState(false);
  const [showRefund, setShowRefund] = useState(false);
  const [Value,setValue] = useState("");
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
//giving the settings function
const handleSettings = ()=>{
   setShowSettings(prev => !prev);
}
//giving the confirm function
const handleConfirmleavegroup = async () => {
  const name = localStorage.getItem("UserName");
  const res = await fetch(import.meta.env.VITE_API_LINK +"group/leave", {
    method: "post",
    headers: {
      'Content-Type': 'application/json',
    },
    body:JSON.stringify({
      name
    })
  });
  const data = await res.json();
  if(res.ok) {
          toast.success(data.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }else{
          toast.error(data.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
      
}
setShowConfirm(false);
}
//group name changing function
const handleConfirmChangeName = async () => {
  const name = localStorage.getItem("UserName");
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
  const res = await fetch(import.meta.env.VITE_API_LINK +"group/changename", {
    method: "post",
    headers: {
      'Content-Type': 'application/json',
    },
    body:JSON.stringify({
      groupId:groupUserData.group,
      newGroupName:Value
    })
  });
  const data = await res.json();
  if(res.ok) {
          toast.success(data.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        else{
          toast.error(data.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
}
setShowChange(false);
}
//Functionlity of reset api
const handleShowReset = async ()=>{
  const name = localStorage.getItem("UserName");
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
  const res = await fetch(import.meta.env.VITE_API_LINK +"group/reset", {
    method: "post",
    headers: {
      'Content-Type': 'application/json',
    },
    body:JSON.stringify({
      groupId:groupUserData.group,
    })
  });
  const data = await res.json();
  if(res.ok) {
          toast.success(data.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        else{
          toast.error(data.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
}
  setShowReset(false)
}
  return (
    <>
    
      <Helmet>
        <title>MealMate Dashboard</title>
        <link rel="icon" type="image/png" href="/logo192.png" />
      </Helmet>

  <div>
   <IoSettings
  title='settings'
  className='settings'
  onClick={handleSettings}
/>
{showSettings && (
  <div className="settings-dropdown">
    <ul>
      <li onClick={handlelogout}>
        <IoLogOut className='logout' title='Logout' />
        <span><b>Logout</b></span>
      </li>
      <li onClick={() => setShowConfirm(true)}>
        <CgLogOut className='logout' title='Logout' />
        <span><b>Leave Group</b></span>
        </li>
      <li onClick={() => setShowChange(true)}>
        <MdModeEditOutline className='logout' title='Logout' />
        <span><b>Group Name</b></span>
      </li>
        <li onClick={()=> setShowReset(true)}>
        <GrPowerReset className='logout' title='Logout' />
        <span><b>Reset</b></span>
      </li>
    </ul>
  </div>
)}
  </div>
    <div className='dash-div'>
      
        <h1 className='dashboard'><span title='Group Name'>{groupValues.groupname}</span> Dashboard</h1>
       
      <div className='dash-div-all'>
      <section className='dash-sec'>
        <h2>Total Cost</h2>
        <span><strong>{groupValues.totalCost} <FaBangladeshiTakaSign/></strong> </span>
      </section >
      <section className='dash-sec'>
        <h2>Total Deposit</h2>
        <span><strong>{groupValues.totalDeposit} <FaBangladeshiTakaSign/></strong></span>
     <button type='button' className='details-btn'
     onClick={() => setShowTotalDeposit(true)}
     >details</button>
      </section>
      <section className='dash-sec'>
        <h2>Total Meal</h2>
        <span><strong>{groupValues.totalMeal}</strong></span>
        <button type='button' className='details-btn'
        onClick={() => setShowTotalMeal(true)}
        >details</button>
      </section >
      </div>
     <div className='dash-div-all'>
     <section className='dash-sec'>
        <h2>Due</h2>
        <span style={{color:"red"}}> <strong>{groupUserValues.due} <FaBangladeshiTakaSign/></strong></span>
        <button type='button' className='details-btn'
        onClick={() => setShowDue(true)}
        >details</button>
      </section>
      <section className='dash-sec'>
        <h2>Pending Amount</h2>
        <span style={{color:"green"}}><strong>{groupUserValues.refund}</strong> <FaBangladeshiTakaSign/></span>
        <button type='button' className='details-btn'
        onClick={() => setShowRefund(true)}
        >details</button>
      </section>
      <section className='dash-sec'>
        <h2>Meal</h2>
        <span><strong>{groupUserValues.numberofMeal}</strong></span>
      </section>
     </div>
     <div className='dash-div-all'>
     <section className='dash-sec'>
        <h2>Your Deposite</h2>
        <span><strong>{groupUserValues.deposit} <FaBangladeshiTakaSign/></strong></span>
      </section>
      <section className='dash-sec'>
        <h2>Total Consumed</h2>
        <span><strong>{groupUserValues.totalConsumed} <FaBangladeshiTakaSign/></strong> </span>
      </section >
      <section className='dash-sec'>
        <h2>Mealrate</h2>
        <span><strong>{groupValues.mealRate} <FaBangladeshiTakaSign/></strong></span>
      </section>
      </div>
    </div>
    <ToastContainer/>
    {showConfirm && (
  <LeaveGroup
    onConfirm={handleConfirmleavegroup}
    onCancel={() => setShowConfirm(false)}
  />
)}
    {showChange && (
  <ConfirmChangeName
    onConfirm={handleConfirmChangeName}
    onCancel={() => setShowChange(false)}
    fetchData={data => setValue(data)}
  />
)}
{showTotalDeposit && (
  <ConfirmTotalDeposit
    onCancel={() => setShowTotalDeposit(false)}
  />
)}
{showTotalMeal && (
  <ConfirmTotalMeal
    onCancel={() => setShowTotalMeal(false)}
  />
)}
{showDue && (
  <ConfirmDue
    onCancel={() => setShowDue(false)}
  />
)}
{showRefund && (
  <ConfirmRefund
    onCancel={() => setShowRefund(false)}
  />
)}
{showReset && (
  <ConfirmReset
    onCancel={() => setShowReset(false)}
    onConfirm={handleShowReset}
  />
)}
    </>
    
  );
}
