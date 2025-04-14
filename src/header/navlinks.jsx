import React from 'react'
import { FaArrowRight } from "react-icons/fa6";
import { HashLink } from 'react-router-hash-link';
import { FaHome } from "react-icons/fa";
import { RiContactsLine } from "react-icons/ri";
import { SiStarship } from "react-icons/si";
import { BsPatchQuestionFill } from "react-icons/bs";
import {NavLink, useNavigate} from 'react-router-dom'
import '../style/navlinks.css'
export default function Navlinks() {
    const navigate = useNavigate();
    const handleNavigation = () =>
    {
        navigate('/signup');
    }
  return (
   <nav className='navigation'>
   <div className='logo'>MealMate</div>
   <ul className='navlink'>
   <li><NavLink className={({isActive})=>isActive ?"link active":"link"} to="/"><FaHome /><span style={{marginLeft:"0.5em"}}>Home</span></NavLink></li>
   <li><NavLink className={({isActive})=>isActive ?"link active":"link"} to="/about"><BsPatchQuestionFill/><span style={{marginLeft:"0.5em"}}>About</span></NavLink></li>
   <li><NavLink className={({isActive})=>isActive ?"link active":"link"} to="/contact"><RiContactsLine /><span style={{marginLeft:"0.5em"}}>Contact</span></NavLink></li>
   <li> <HashLink smooth to="/#features"><SiStarship href='#features' /><span style={{marginLeft:"0.5em"}}>Features</span></HashLink></li>
   
   
   </ul>
   <button className='get-started' onClick={handleNavigation}><FaArrowRight className='arrow'/>Get Started</button>
   </nav>
  )
}
