import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("Authorization");

    (async () => {
      try {
        const res = await fetch("http://127.0.0.1:3000/app/mealmate/api/dashboard", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
          }
        });
        const data = await res.json();
        console.log(data);
        
      } catch (err) {
        console.error("Redirecting due to error:", err.message);
        navigate('/login');
      }
    })();
  }, []);

  return (
    <div>Dashboard</div>
  );
}
