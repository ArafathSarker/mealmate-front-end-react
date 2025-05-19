import React,{useEffect,useState} from 'react'
import { Helmet } from "react-helmet";
import "../style/homepage.css"
import mobile from "../assets/mobile.png"
import hero from "../assets/hero.png"
import Loading from './Loading';
import { useNavigate } from 'react-router-dom'
export default function Home() {
  const navigate = useNavigate();
  const [showbutton,setbutton] = useState(false);
  const [loading, setLoading] = useState(true);
      useEffect(()=>{
        const token = localStorage.getItem("Authorization");
        (async()=>{      
                  try{        
                    const res = await fetch(import.meta.env.VITE_API_LINK+"dashboard",{
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
                finally {
        setLoading(false); 
      }
  
              })();
      });
  const handleSignUp=()=>{
     navigate('./signup');
  }
  const handleLogin=()=>{
    navigate('./login');
  }
  const handledashboardbtn =()=>{
       navigate('/dashboard');
  }
  return (
    <> 
    <Helmet>
        <title>MealMate - Effortless Group Meal Management</title>
        
      </Helmet>
      {loading ? (
        <Loading/>
      ) : (
        <>
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

    <button className={(showbutton ? "dashboard-btn" : "no-dashboard-btn")}
    onClick={handledashboardbtn}
    >Dashboard</button>
    <div className={(showbutton ? 'not-btn-show' :'btn')}>
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
<section className="developer-section">
  <h2>Developer</h2>
  <div className="developer-card">
    <h3>Arafath</h3>
    <p>
      Hi! I'm Arafath, a 3rd year CSE student passionate about exploring new technologies and cyber security. 
      I love building projects, learning modern web development, and sharing knowledge with the community.
    </p>
    <ul>
      <li><strong>Branch:</strong> Computer Science & Engineering (3rd Year)</li>
      <li><strong>Interests:</strong> Web Development, Cyber Security, New Tech</li>
      <li><strong>Currently Exploring:</strong> React, Node.js, Cloud, Security</li>
    </ul>
    
   <div className="social-links">
  <a href="https://github.com/arafath432/" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
    <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 013.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.372.823 1.102.823 2.222v3.293c0 .322.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>
  </a>
  <a href="https://www.linkedin.com/in/arafath-sarker/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
    <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.75 20h-3v-10h3v10zm-1.5-11.27c-.97 0-1.75-.79-1.75-1.76s.78-1.76 1.75-1.76 1.75.79 1.75 1.76-.78 1.76-1.75 1.76zm15.25 11.27h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.59z"/>
    </svg>
  </a>
</div>
  </div>
</section>
   </div>
   </>
      )}
   </>
  )
}
