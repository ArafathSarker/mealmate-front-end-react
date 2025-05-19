import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
           const groupres = await fetch(import.meta.env.VITE_API_LINK +`group/user/${username}`,{
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
          const adduserres = await fetch(import.meta.env.VITE_API_LINK +`group/adduser`,{
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
          if(adduserdata.success || groupdata.success) {
            toast.success("Group Created Successfully", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setTimeout(() => {
              navigate("/dashboard");
            }, 2000);
          }else {
            toast.error("Group Creation Failed", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
          
      }catch(err)
      {
           console.log(`Sorry error:${err}`);
      }
    }
  return (
    <>
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
          <span>Add Members (Optional)</span>
         </label>
         <button type='submit' className='grpsubmitbtn'>submit</button>
         </form>
    </div>
    <ToastContainer/>
    </>
  )
}
