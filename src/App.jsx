import React from 'react'
import Navlinks from './header/navlinks'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './main/Home'
import About from './main/About'
import Contact from "./main/Contact"
import Signup from './main/Signup'
import Footer from './fotter/Fotter'
import Login from './main/Login'
import InvalidRoute from './invalid-route/InvalidRoute'
import Dashboard from './main/Dashboard'
import Calculate from './main/Calculate'
import List from './main/List'
import Dashboardnav from './header/dashboardnav'
export default function App() {
    const location = useLocation();
    const shownav = ['/dashboard','/calculate','/list'].includes(location.pathname);
  return (
   <>
  {!shownav && <Navlinks />}
  {shownav && <Dashboardnav /> } 
   <Routes>
    <Route path='/' element={<Home />}/>
    <Route path='/about' element={<About />}/>
    <Route path='/contact' element={<Contact/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/login' element={<Login />}/>
    <Route path='/dashboard' element={<Dashboard />}/>
    <Route path='/calculate' element={<Calculate />}/>
    <Route path='/list' element={<List />}/>
    <Route path="*" element={<InvalidRoute />} />
   </Routes>
  {!shownav && <Footer />} 
   </>
  )
}
