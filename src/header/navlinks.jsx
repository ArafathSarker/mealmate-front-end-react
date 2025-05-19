import React,{useEffect,useState} from 'react'
import { FaArrowRight } from "react-icons/fa6";
import { HashLink } from 'react-router-hash-link';
import { FaHome } from "react-icons/fa";
import { RiContactsLine } from "react-icons/ri";
import { SiStarship } from "react-icons/si";
import { CgProfile } from "react-icons/cg";
import { BsPatchQuestionFill } from "react-icons/bs";
import {NavLink, useNavigate} from 'react-router-dom'
import '../style/navlinks.css'
export default function Navlinks() {
    const navigate = useNavigate();
    const [showbutton,setbutton] = useState(false);
    useEffect(()=>{
      const token = localStorage.getItem("Authorization");
      (async()=>{      
                try{        
                  const res = await fetch(import.meta.env.VITE_API_LINK +`dashboard`,{
                    method:'GET',
                    headers:{
                      'Content-Type': 'application/json',
                      'Authorization': token,
                    }
                  });

                     const data = await res.json();
                     if(data.success)  setbutton(true);
                }
             catch(err){
                setbutton(false);
             }

            })();
    });
    const handleNavigation = () =>
    {
        navigate('/signup');
    }
    const handleDashboard=()=>{
          navigate('/dashboard');
    }
  return (
   <nav className='navigation'>
   <div className='logo'>MealMate</div>
   <ul className='navlink'>
   <li><NavLink className={({isActive})=>isActive ?"active":"link"} to="/"><FaHome /><span style={{marginLeft:"0.5em"}}>Home</span></NavLink></li>
   <li><NavLink className={({isActive})=>isActive ?"active":"link"} to="/about"><BsPatchQuestionFill/><span style={{marginLeft:"0.5em"}}>About</span></NavLink></li>
   <li><NavLink className={({isActive})=>isActive ?"active":"link"} to="/contact"><RiContactsLine /><span style={{marginLeft:"0.5em"}}>Contact</span></NavLink></li>
   <li> <HashLink smooth to="/#features"><SiStarship href='#features' /><span style={{marginLeft:"0.5em"}}>Features</span></HashLink></li>
   
   
   </ul>
    <CgProfile onClick={handleDashboard} style={ showbutton ? {fontSize:'2em',cursor:"pointer"}:{display:"none"}}/>
    <button className={(showbutton ? 'not-show':'get-started')} onClick={handleNavigation}><FaArrowRight className='arrow'/>Get Started</button>
   </nav>
  )
}
