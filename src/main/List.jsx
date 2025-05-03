import React,{useEffect, useState} from 'react'
import GroupForm from './GroupForm'
import { useNavigate } from 'react-router-dom';
export default function List() {
  const [checkCalculate,setcheckCalculate] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
      const token = localStorage.getItem("Authorization");
      const name = localStorage.getItem("UserName");
      (async () => {
        try {
          const res = await fetch("http://127.0.0.1:3000/app/mealmate/api/dashboard", {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token,
            }
          });
          const checkres = await fetch("http://127.0.0.1:3000/app/mealmate/api/group/check/user", {
            method: "post",
            headers: {
              'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                 name
            })
          });
          const data = await res.json();
          const checkData = await checkres.json();
          if(checkData.success){
            setcheckCalculate(true);
          }
          if(data.success){
            navigate('/list');
          }
          // Do something with data if needed
        } catch (err) {
          console.error("Redirecting due to error:", err.message);
          navigate('/login');
        }
      })();
    }, []);
 return (
  <>
  {checkCalculate && <div>
     <h1>Hello I am list page</h1>
  </div>}
  {!checkCalculate && <GroupForm /> }
  </>
 

);};
