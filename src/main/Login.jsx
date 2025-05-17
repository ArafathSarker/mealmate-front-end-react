import React,{useEffect, useState} from 'react'
import LoginImage from "../assets/login.png"
import {Link,useNavigate} from "react-router-dom"
import { Helmet } from "react-helmet";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import useSend from '../customHooks/useSend';
import "../style/login.css"
export default function Login() {
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
          const data = await res.json();
          if(data.success){
            navigate('/');
          }
          // Do something with data if needed
        } catch (err) {
          console.error("Redirecting due to error:", err.message);
          navigate('/login');
        }
      })();
    }, []);
   const [showPassword, setShowPassword] = useState(false);
   
   const [Values,setValues] = useState({
    username:"",
    password:""
   });
    const togglePasswordVisibility = () => {
      setShowPassword(setShowPassword => !setShowPassword);
    };

    const handleChange = (e)=>{
           const {name,value} = e.target;
          setValues((prev)=>({
              ...prev,
              [name]:value   
          }));
    }

    const handlelogin = async (e)=>{
      e.preventDefault();
      const res = await useSend("http://127.0.0.1:3000/app/mealmate/api/login",Values);
          if(res.status==200) 
            { 
              localStorage.setItem("Authorization",res.token);
              localStorage.setItem("UserName",res.username);
              toast.success("Login Successful", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              setTimeout(() => {
                navigate('/dashboard');
              }
              , 2000);
            }
            else if(res.status==400){
              toast.error(res.message, {
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
              toast.error("Something went wrong", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }    
          
    }
  
  return (
    <>
  <Helmet>
        <title>MealMate - Login</title>
  </Helmet>
    <div className='login-form-wrapper'>
    <form className='login-form' onSubmit={handlelogin}>
      <div className='login-input-wrapper' >
        <h2>Welcome Back</h2>
        <p>Log in to your MealMate account</p>
        <label htmlFor="username" >
          <input name='username' 
          value={Values.username}
          onChange={handleChange}
          type='text' placeholder=' ' required/>
          <span>Username</span>
        </label>
  
       <label htmlFor="password">
               <input 
               required
               value={Values.password}
               onChange={handleChange}
               className='pass' 
               name='password'
                type={showPassword ? "text" :"password"}
                 placeholder=' '/>
               <span>Password</span>
                {showPassword ? < FaEye onClick={togglePasswordVisibility} className='eye-icon'/> : <FaEyeSlash onClick={togglePasswordVisibility} className='eye-icon'/>}
      </label>
  
        <button type='submit' className='login-btn'>Let's Go</button>
        <p className='ask-to-sign-up'>
          Don't have an account? <Link to='/signup'><strong style={{color:"black"}}>Create one</strong></Link>
        </p>
      </div>
  
      <picture className='login-image'>
        <img src={LoginImage} alt="Login image" />
      </picture>
    </form>
  </div>
  <ToastContainer/>
  </>
  )
}
