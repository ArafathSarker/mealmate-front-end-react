import React from 'react'
import {useNavigate} from 'react-router-dom'
import '../style/404page.css'
export default function InvalidRoute() {

    const navigate = useNavigate();
    const backhome = ()=>{
        navigate('/');
    }

  return (
    <div className='whole-wrapper'>
        <div className='main-wrapper'>
            <div>
            <h1>404</h1>
            <h2>Ooops!</h2>
            <h2>Page Not Found</h2>
            </div>
            
            <p>This page doesn't exist or was removed!
                we suggest you back to home </p>

            <button onClick={backhome} className='goback-btn'>Back to home</button>
        </div>
    </div>
  )
}
