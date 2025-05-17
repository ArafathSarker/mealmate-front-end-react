import React,{useEffect, useState} from 'react'
import GroupForm from './GroupForm'
import { useNavigate } from 'react-router-dom'
import { Helmet } from "react-helmet";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../style/calculate.css'
import ConfirmModal from './confirmModal'
export default function Calculate() {
  const [checkCalculate,setcheckCalculate] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
   const [Values,setValues] = useState({
       addmembers:'',
       meal:'',
       deposit:'',
       addcost:'',
       username:'',
    });
    //security check is the member already in a group or not
  useEffect(() => {
      const token = localStorage.getItem("Authorization");
      const name = localStorage.getItem("UserName");
      (async () => {
        try {
          const res = await fetch("http://127.0.0.1:3000/app/mealmate/api/dashboard", {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token,
            }
          });
          const checkres = await fetch("http://127.0.0.1:3000/app/mealmate/api/group/check/user", {
            method: "post",
            headers: {
              'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                 name
            })
          });
          const data = await res.json();
          const checkData = await checkres.json();
           if(data.success){
            navigate('/calculate');
          }
          if(checkData.success){
            setcheckCalculate(true);
          }
         
          
        } catch (err) {
          navigate('/login');
        }
      })();
    }, []);
    //Updating the state values from input fields
    const handleChange = (e)=>{
      const {name,value} = e.target;
      setValues(prev=>({
            ...prev,
            [name]:value
      }));
 };
 //For stop refreshing the browser
 const handleSubmit = async (e)=>
  {
    e.preventDefault();
  }
  //For adding members in the group with api
  const handleaddmembersubmit = async (e)=>{
     e.preventDefault();
        try{
            const name = localStorage.getItem("UserName");
           const groupres = await fetch(`http://127.0.0.1:3000/app/mealmate/api/data/group`,{
              method:"post",
              headers:{
                'Content-Type': 'application/json'
              },
              body:JSON.stringify({
                name
              })
            });
            const groupdata = await groupres.json();
           const userList = Values.addmembers.split(" ");
          const adduserres = await fetch(`http://127.0.0.1:3000/app/mealmate/api/group/adduser`,{
            method:"post",
            headers:{
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({
              groupname:groupdata.groupname,
              userList:userList
            })
          });

          const adduserdata = await adduserres.json();
          if(adduserdata.success && groupdata.success) {
            toast.success(adduserdata.message, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }else{
            toast.error(adduserdata.message, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        
          
      }catch(err)
      {
           console.log(`Sorry error:${err}`);
      }
  }
  //updating the deposit amount of the user
  const handledepositsubmit = async(e)=>{
     e.preventDefault();
    try{
      const name = localStorage.getItem("UserName");
     const groupuserres = await fetch(`http://127.0.0.1:3000/app/mealmate/api/data/groupuser`,{
        method:"post",
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          name
        })
      });
    const groupuserdata = await groupuserres.json();
    const depositres = await fetch(`http://127.0.0.1:3000/app/mealmate/api/data/updatedeposit`,{
      method:"post",
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        userId:groupuserdata._id,
        groupId:groupuserdata.group,
        depositAmount:Values.deposit
      })
    });
   const depositdata = await depositres.json();
    
    if(depositres.ok) {
      toast.success(depositdata.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else{
      toast.error(depositdata.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    
}catch(err)
{
     console.log(`Sorry error:${err}`);
}
  }
  const handleaddmealsubmit = async(e)=>{
     e.preventDefault();
    try{
      const name = localStorage.getItem("UserName");
     const groupuserres = await fetch(`http://127.0.0.1:3000/app/mealmate/api/data/groupuser`,{
        method:"post",
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          name
        })
      });
    const groupuserdata = await groupuserres.json();
    const mealres = await fetch(`http://127.0.0.1:3000/app/mealmate/api/data/updatemeals`,{
      method:"post",
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        userId:groupuserdata._id,
        groupId:groupuserdata.group,
        mealCount:Values.meal
      })
    });
    const mealdata = await mealres.json();
    if(mealres.ok){
      toast.success(mealdata.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else{
      toast.error(mealdata.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    
    
}catch(err)
{
     console.log(`Sorry error:${err}`);
}
  }

  //adding cost to the group
  const handleaddcostsubmit = async(e)=>{
     e.preventDefault();
    try{
      const name = localStorage.getItem("UserName");
     const groupuserres = await fetch(`http://127.0.0.1:3000/app/mealmate/api/data/groupuser`,{
        method:"post",
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          name
        })
      });
    const groupuserdata = await groupuserres.json();
    const addcostres = await fetch(`http://127.0.0.1:3000/app/mealmate/api/data/updateaddcost`,{
      method:"post",
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        groupId:groupuserdata.group,
        cost:Values.addcost
      })
    });

    const addcostdata = await addcostres.json();
    if(addcostres.ok){
      toast.success(addcostdata.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else{
      toast.error(addcostdata.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    
}catch(err)
{
     console.log(`Sorry error:${err}`);
}
  }
  //clearing dues of the user
  const handleclearduesubmit = async(e)=>{
    e.preventDefault();
    try{
      const name = localStorage.getItem("UserName");
    const cleardueres= await fetch(`http://127.0.0.1:3000/app/mealmate/api/data/cleardue`,{
      method:"post",
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        name,
        username:Values.username
      })
    });

    const clearduedata = await cleardueres.json();
     if(cleardueres.ok){
      toast.success(clearduedata.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else{
      toast.error(clearduedata.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    
}catch(err)
{
     console.log(`Sorry error:${err}`);
}
  }
  //handleling pop up message
  const handleConfirm = async () => {
   
    const name = localStorage.getItem("UserName");
    const calres = await fetch(`http://127.0.0.1:3000/app/mealmate/api/group/calculate`,{
        method:"post",
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          name
        })
      });
      const caldata = await calres.json();
    if(calres.ok){
      toast.success(caldata.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else{
      toast.error(caldata.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
     setShowConfirm(false);
  }
 return (
  <>
  <Helmet>
        <title>MealMate - Meal Cost Calculator</title>
  </Helmet>
  
  {checkCalculate && <div className='calculate-form-wrapper'>
    <form onSubmit={handleSubmit} className='calculate-form'>
    <div className="heading-wrapper">
  <h1>MealMate Calculator</h1>
  <h3>Easily calculate meal costs, deposits, and dues.</h3>
</div>
      <div className='div-wrapper-all'>
      <div>
        <label htmlFor='addmmembers'>
          <input 
          value={Values.addmembers}
          type='text'
          onChange={handleChange}
          name='addmembers'
           className='addmembers' 
           placeholder=' '/>
          <span>Add Members</span>
         </label>
         <button type='submit' className='normalbtn' onClick={handleaddmembersubmit}>submit</button>
        </div>
        <div>
        <label htmlFor='deposit'>
          <input 
          value={Values.deposit}
          type='text'
          onChange={handleChange}
          name='deposit'
           className='deposit' 
           placeholder=' '/>
          <span>Deposit</span>
         </label>
         <button type='submit' className='normalbtn' onClick={handledepositsubmit}>deposit</button>
        </div>
        <div>
        <label htmlFor='meal'>
          <input 
          value={Values.meal}
          type='text'
          onChange={handleChange}
          name='meal'
           className='meal' 
           placeholder=' '/>
          <span>Add Meal</span>
         </label>
         <button type='submit' className='normalbtn' onClick={handleaddmealsubmit}>add</button>
        </div>
      </div>
       <div className='div-wrapper-all'>
        <div>
        <label htmlFor='addcost'>
          <input 
          value={Values.addcost}
          type='text'
          onChange={handleChange}
          name='addcost'
           className='addcost' 
           placeholder=' '/>
          <span>Add Cost</span>
         </label>
         <button type='submit' className='normalbtn' onClick={handleaddcostsubmit}>add</button>
        </div>
        <div>
        <label htmlFor='username'>
          <input 
          value={Values.username}
          type='text'
          onChange={handleChange}
          name='username'
           className='username' 
           placeholder=' '/>
          <span>Username</span>
         </label>
         <button type='submit' className='normalbtn' onClick={handleclearduesubmit}>clear</button>
        </div>
        <button type='button' className='calculatebtn'
        onClick={() => setShowConfirm(true)}>Calculate</button>
        </div>
    </form>
     <ToastContainer/>
  </div>}
  {!checkCalculate && <GroupForm /> }
  {showConfirm && (
  <ConfirmModal
    onConfirm={handleConfirm}
    onCancel={() => setShowConfirm(false)}
  />
)}
  </>
 

);};
