import React from 'react'
import {NavLink} from 'react-router-dom'
import { MdSpaceDashboard } from "react-icons/md";
import { ImCalculator } from "react-icons/im";
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
            to='/calculate'><span><ImCalculator/></span></NavLink></li>
            <li><NavLink 
            className={({isActive}) => isActive ? "dash-active" : "dash-link"}
            to='/list'><span><TbListSearch/></span></NavLink></li>
        </ul>
    </div>
  )
}
