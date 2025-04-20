import React from 'react'
import Navlinks from './header/navlinks'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './main/Home'
import About from './main/About'
import Contact from "./main/Contact"
import Signup from './main/Signup'
import Footer from './fotter/Fotter'
import Login from './main/Login'
import InvalidRoute from './invalid-route/InvalidRoute'
import Dashboard from './main/Dashboard'
export default function App() {
  return (
   
   <BrowserRouter>
   <Navlinks />
   <Routes>
    <Route path='/' element={<Home />}/>
    <Route path='/about' element={<About />}/>
    <Route path='/contact' element={<Contact/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/login' element={<Login />}/>
    <Route path='/dashboard' element={<Dashboard />}/>
    <Route path="*" element={<InvalidRoute />} />
   </Routes>
   <Footer />
   </BrowserRouter>  
  )
}
