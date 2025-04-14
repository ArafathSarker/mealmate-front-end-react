import React from 'react'
import { FaFacebook,FaLinkedin , FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { AiFillInstagram } from "react-icons/ai";
import "../style/footer.css"
export default function Fotter() {
  
  return (
   <fotter>
      <div className='footer-main'>
        <ul>
          <li>MealMate</li>
          <li>We create digital products for barans and companies 
          by using technology.</li>
          <li>
          <div className='icon'>
          <FaFacebook/>
            <AiFillInstagram/>
            <FaLinkedin/>
            < FaTwitter />
            </div>
          </li>
          </ul>
          <ul>
          <li>Company</li>
          <li>About company</li>
          <li>Company services</li>
          <li>Job opportunities</li>
          <li>Creative people</li>
          <li>Contact us</li>
        </ul>
        <ul>
          <li>Customer</li>
          <li>Client support</li>
          <li>Last news</li>
          <li>Company story</li>
          <li>Price pagages</li>
          <li>Who we are</li>
        </ul>
         <ul>
          <li>Subscribe To Newsletter</li>
          <li>Enter your email for reciving 
          valuable newsletters.</li>
          <li><input id='email' type="email"/><button><MdEmail style={{color:"white"}}/></button></li>
          <li><p className='year'>&copy;{new Date().getFullYear()} MealMate</p></li>
         </ul> 
      </div> 
   </fotter>
  )
}
