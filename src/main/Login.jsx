import React,{useState} from 'react'
import LoginImage from "../assets/login.png"
import {Link} from "react-router-dom"
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import "../style/login.css"
export default function Login() {
   const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
      setShowPassword(setShowPassword => !setShowPassword);
    };
    const handlelogin = (e)=>{
      e.preventDefault();
    }
  
  return (
    <div className='login-form-wrapper'>
    <form className='login-form' onSubmit={handlelogin}>
      <div className='login-input-wrapper' >
        <h2>Welcome Back</h2>
        <p>Log in to your MealMate account</p>
        <label htmlFor="username" >
          <input name='username' type='text' placeholder=' ' required/>
          <span>Email/Username</span>
        </label>
  
       <label htmlFor="password">
               <input 
               required
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
  
  )
}
