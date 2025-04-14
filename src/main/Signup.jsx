import React ,{useState} from 'react'
import signupImage from "../assets/signup.png"
import {Link} from "react-router-dom"
import "../style/signup.css"
import { FaEye, FaEyeSlash } from 'react-icons/fa';
export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(setShowPassword => !setShowPassword);
  };
  const handlesignup = (e)=>{
    e.preventDefault();
  }

  
  return (
    <div className='form-wrapper'>
       <form className='signup-form' onSubmit={handlesignup}>
        <div className='input-wrapper'>
        <h2>Get Started</h2>
        <p>Wlcome to MealMate-Let's create your account</p>
        <label htmlFor="username">
        <input name='username' type='text'required placeholder=' '/>
        <span>Username</span>
        </label>
       
        <label htmlFor="email">
        <input name='email' type='email' required placeholder=' '/>
        <span>Email</span>
        </label>
        
        <label htmlFor="password">
        <input 
        className='pass' 
        name='password'
         type={showPassword ? "text":"password"}
          placeholder=' '
          required/>
        <span>Password</span>
         {showPassword ? < FaEye onClick={togglePasswordVisibility} className='eye-icon'/> : <FaEyeSlash onClick={togglePasswordVisibility} className='eye-icon'/>}
        </label>
       
        <button type='submit' className='signup-btn'>Create Account</button>
        <p className='ask-to-log-in'>Already have an account?<Link to='/login' ><strong style={{color:"black"}}> Log in</strong></Link></p>
      
        </div>
        <picture className='signup-image'>
               <img src={signupImage} alt="Sign up image" />
      </picture>
      </form>
      
    </div>
     
  )
}
