import React from 'react'
import '../style/contact.css'
import { MdEmail } from "react-icons/md";
import { FaLocationArrow } from "react-icons/fa";
export default function Contact() {
  const handlesubmit = (e)=>{
    e.preventDefault();
  }
  return (
   <div className='contact-wrapper'>
    <form onSubmit={handlesubmit} className='contact-form'>
    <div className='contact-input-wrapper'>
    <h1>Contact Us</h1>
    <p>Feel free to contact us anytime.
      We will get back to you as soon as we can!
    </p>
       <label htmlFor='name'>
        <input name='name' type='text' placeholder=' '/>
        <span>Name</span>
       </label>
       <label htmlFor='email'>
        <input name='name' type='email' placeholder=' '/>
        <span>Email</span>
       </label>
       <label htmlFor='messege'>
        <input name='messege' type='text' placeholder=' '/>
        <span>Message</span>
       </label>
       <button type='submit' className='send-btn'>Send</button>
    </div>
    </form>
    <div className='companay-contact-wrapper'>
        <h2>Info</h2>
        <p><a href='mailto:arafathmd324@gmail.com' style={{color:"white"}}><MdEmail className='all-icon'/> arafathmd324@gmail.com</a></p>
        <p><FaLocationArrow className='all-icon'/> Dhaka, Uttara</p>
    </div>
   </div>
  )
}
