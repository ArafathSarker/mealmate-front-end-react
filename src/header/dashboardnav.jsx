import React from 'react'
import {NavLink} from 'react-router-dom'
import { MdSpaceDashboard } from "react-icons/md";
import { CiCalculator2 } from "react-icons/ci";
import { TbListSearch } from "react-icons/tb";
import '../style/dashboard.css'
export default function Dashboardnav() {
  return (
    <div className='dashboard-nav'>
        <ul className='dashboard-nav-link'>
            <li><NavLink className={({isActive}) => isActive ? "dash-active" : "dash-link"}
             to='/dashboard'><span><MdSpaceDashboard/></span></NavLink></li>
            <li><NavLink 
            className={({isActive}) => isActive ? "dash-active" : "dash-link"}
            to='/calculate'><span><CiCalculator2/></span></NavLink></li>
            <li><NavLink 
            className={({isActive}) => isActive ? "dash-active" : "dash-link"}
            to='/list'><span><TbListSearch/></span></NavLink></li>
        </ul>
    </div>
  )
}
