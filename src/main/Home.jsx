import React from 'react'
import "../style/homepage.css"
import mobile from "../assets/mobile.png"
import hero from "../assets/hero.png"
import { useNavigate } from 'react-router-dom'
export default function Home() {
  const navigate = useNavigate();
  const handleSignUp=()=>{
     navigate('./signup');
  }
  const handleLogin=()=>{
    navigate('./login');
  }
  return (
   <div>
   <section className='hero-section'>
   <div class="custom-shape-divider-bottom">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
    </svg>
</div>
    <div className='hero'>
    <h1>Start Tracking Your Meal Spending Today!</h1>
    <p>Easily calculate the cost of your meals and keep track of your food expenses.
    Sign up now and take control of your meal costs.</p>
    <div className='btn'>
    <button id="signup" onClick={handleSignUp}>Sign Up</button>
    <button id="login" onClick={handleLogin}>Log In</button>
    </div>
  </div>
  <div className='img'>
  <picture>
        <source media="(min-width: 768px)" srcSet={hero}/>
        <img src={mobile} alt="Food Image" />
      </picture>
  </div>
  </section>

  <section className="features-section" id="features">
  <h2 >Key Features</h2>
  <div className="features-wrapper-1">
    
    <div className="feature-card">
      <h3>Meal Cost Calculator</h3>
      <p>Instantly calculate how much you're spending on each meal with a simple, intuitive interface.</p>
    </div>

    <div className="feature-card">
      <h3>Daily & Weekly Tracking</h3>
      <p>Get insights into your spending habits with daily, weekly, and monthly reports.</p>
    </div>

    <div className="feature-card">
      <h3>Custom Meal Entries</h3>
      <p>Add your own meals, ingredients, and prices—flexible for all eating habits and diets.</p>
    </div>
    </div>
    <div className='features-wrapper-2'>
    <div className="feature-card">
      <h3>Budget Goals</h3>
      <p>Set budget limits and get alerts when you’re close to your monthly spending target.</p>
    </div>
    
    <div className="feature-card">
      <h3>Mobile Friendly</h3>
      <p>Track your meals anytime, anywhere. Fully responsive and mobile-optimized design.</p>
    </div>

    <div className="feature-card">
      <h3>Cloud Sync</h3>
      <p>Save your meal data securely and access it across all your devices.</p>
    </div>
    </div>
 
</section>

   </div>
  )
}
