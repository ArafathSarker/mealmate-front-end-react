import React,{useEffect, useState} from 'react'
import GroupForm from './GroupForm'
import { useNavigate } from 'react-router-dom'
import '../style/calculate.css'
export default function Calculate() {
  const [checkCalculate,setcheckCalculate] = useState(false);
  const navigate = useNavigate();
   const [Values,setValues] = useState({
       addmembers:'',
       meal:'',
       deposit:'',
       addcost:'',
       username:'',
       cleardue:'',
    });
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
          if(checkData.success){
            setcheckCalculate(true);
          }
          if(data.success){
            navigate('/calculate');
          }
          // Do something with data if needed
        } catch (err) {
          console.error("Redirecting due to error:", err.message);
          navigate('/login');
        }
      })();
    }, []);
    const handleChange = (e)=>{
      const {name,value} = e.target;
      setValues(prev=>({
            ...prev,
            [name]:value
      }));
 };
 const handleSubmit = async (e)=>
  {
    e.preventDefault();
  }
 return (
  <>
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
         <button type='submit' className='normalbtn'>submit</button>
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
         <button type='submit' className='normalbtn'>deposit</button>
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
         <button type='submit' className='normalbtn'>add</button>
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
         <button type='submit' className='normalbtn'>add</button>
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
          <label htmlFor='cleardue'>
          <input 
          value={Values.cleardue}
          type='text'
          onChange={handleChange}
          name='cleardue'
           className='cleardue' 
           placeholder=' '/>
          <span>Amount</span>
         </label>
         <button type='submit' className='normalbtn'>clear</button>
        </div>
        <button type='submit' className='calculatebtn'>Calculate</button>
        </div>
    </form>
  </div>}
  {!checkCalculate && <GroupForm /> }
  </>
 

);};
