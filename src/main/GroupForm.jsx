import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import "../style/groupform.css"
export default function GroupForm() {
  const navigate = useNavigate();
  const [Values,setValues] = useState({
     groupname:'',
     addmembers:''
  });
  const handleChange = (e)=>{
       const {name,value} = e.target;
       setValues(prev=>({
             ...prev,
             [name]:value
       }));
  };
  const handleSubmit = async (e)=>
    {
      e.preventDefault();
      try{
            const username = localStorage.getItem("UserName");
           const groupres = await fetch(`http://127.0.0.1:3000/app/mealmate/api/group/user/${username}`,{
              method:"post",
              headers:{
                'Content-Type': 'application/json'
              },
              body:JSON.stringify({
                groupname:Values.groupname 
              })
            });
            const groupdata = await groupres.json();
           const userList = Values.addmembers.split(" ");
          const adduserres = await fetch(`http://127.0.0.1:3000/app/mealmate/api/group/adduser`,{
            method:"post",
            headers:{
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({
              groupname:Values.groupname,
              userList:userList
            })
          });

          const adduserdata = await adduserres.json();
          if(adduserdata.success || groupdata.success) navigate("/dashboard");
          
      }catch(err)
      {
           console.log(`Sorry error:${err}`);
      }
    }
  return (
    <div className='groupformwrapper'>
        <form className='groupform'
        
        onSubmit={handleSubmit}>
         <h1>Create Your First Group</h1>
         <label htmlFor='gorupname'>
          <input
          value={Values.groupname}
          onChange={handleChange}
          type='text'
           name='groupname' 
           className='grpname' 
           placeholder=' '/>
          <span>Groupname</span>
         </label>
         <label htmlFor='addmmembers'>
          <input 
          value={Values.addmembers}
          type='text'
          onChange={handleChange}
          name='addmembers'
           className='addmembers' 
           placeholder=' '/>
          <span>Add Members</span>
         </label>
         <button type='submit' className='grpsubmitbtn'>submit</button>
         </form>
    </div>
  )
}
