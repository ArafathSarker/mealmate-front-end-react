import React ,{useState,useEffect} from 'react'
import signupImage from "../assets/signup.png"
import {Link,useNavigate} from "react-router-dom"
import "../style/signup.css"
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import useSend from '../customHooks/useSend';
export default function Signup() {
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
          console.log(data);
          if(data.success){
            navigate('/');
          }
          // Do something with data if needed
        } catch (err) {
          console.error("Redirecting due to error:", err.message);
          navigate('/signup');
        }
      })();
    }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [Values,setValues] = useState({
    username:'',
    email:'',
    password:''
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

  const handlesignup = async (e)=>{
    e.preventDefault();
    const res = await useSend("http://127.0.0.1:3000/app/mealmate/api/signup",Values);
    if(res.status==201)  navigate('/login');
  };
  
  
  return (
    <div className='form-wrapper' >
       <form className='signup-form' onSubmit={handlesignup} 
       action='/signup' method='post'>
        <div className='input-wrapper'>
        <h2>Get Started</h2>
        <p>Wlcome to MealMate-Let's create your account</p>
        <label htmlFor="username">
        <input name='username' 
          value={Values.username}
          onChange={handleChange}  
          type='text'required placeholder=' '/>
        <span>Username</span>
        </label>
       
        <label htmlFor="email">
        <input name='email' type='email'
        value={Values.email}
        onChange={handleChange} required placeholder=' '/>
        <span>Email</span>
        </label>
        
        <label htmlFor="password">
        <input 
        value={Values.password}
        onChange={handleChange}
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
