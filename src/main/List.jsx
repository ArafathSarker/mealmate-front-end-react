import React,{useEffect, useState} from 'react'
import GroupForm from './GroupForm'
import { useNavigate } from 'react-router-dom'
import { Helmet } from "react-helmet";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GroupLists from './displayList'
import '../style/list.css'
export default function List() {
  const [checkCalculate,setcheckCalculate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [Values,setValues] = useState({
        item1_name:'',
        item1_price:'',
        item2_name:'',
        item2_price:'',
        item3_name:'',
        item3_price:'',
        item4_name:'',
        item4_price:'',
        item5_name:'',
        item5_price:'',
        item6_name:'',
        item6_price:'',
        item7_name:'',
        item7_price:'',
        item8_name:'',
        item8_price:'',
        item9_name:'',
        item9_price:'', 
        item10_name:'',
        item10_price:'',
    });

  const navigate = useNavigate();
  useEffect(() => {
      const token = localStorage.getItem("Authorization");
      const name = localStorage.getItem("UserName");
      (async () => {
        try {
          const res = await fetch(import.meta.env.VITE_API_LINK +"dashboard", {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token,

            }
          });
          const checkres = await fetch(import.meta.env.VITE_API_LINK +"group/check/user", {
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
        finally {
        setLoading(false); 
      }
      })();
    }, []);
    //form handeling
    const handlelistformsubmit = async (e) => {
      e.preventDefault();
       const name = localStorage.getItem("UserName");
       const groupuserres = await fetch(import.meta.env.VITE_API_LINK +`data/groupuser`,{
        method:"post",
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          name
        })
      });
    const groupuserdata = await groupuserres.json();
    const setobject = (name,price) =>{
      if(name != '' && price != ''){
        return {
          name,
          price:parseFloat(price)
        }
      }
      else return null;
    }
    const items = {item1:setobject(Values.item1_name,Values.item1_price),
            item2:setobject(Values.item2_name,Values.item2_price),
            item3:setobject(Values.item3_name,Values.item3_price),
            item4:setobject(Values.item4_name,Values.item4_price),
            item5:setobject(Values.item5_name,Values.item5_price),
            item6:setobject(Values.item6_name,Values.item6_price),
            item7:setobject(Values.item7_name,Values.item7_price),
            item8:setobject(Values.item8_name,Values.item8_price),
            item9:setobject(Values.item9_name,Values.item9_price),
            item10:setobject(Values.item10_name,Values.item10_price)};

            const filterdItems = Object.fromEntries(
    Object.entries(items).filter(([key, value]) => value !== null)
  );
    const addlist = await fetch(import.meta.env.VITE_API_LINK +`data/addlist`,{
        method:"post",
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            group:groupuserdata.group,
            ...filterdItems
            
        })
      });
      const addlistdata = await addlist.json();
       if(addlist.ok) {
        toast.success(addlistdata.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }else{
        toast.error(addlistdata.message, {
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
    }
    //tracking input changes
    const handleChange = (e) => {
      const { name, value } = e.target;
      setValues((prev) => ({
        ...prev,
        [name]: value
      }));
    }
 return (
  <>
  <Helmet>
          <title>MealMate - Group Item List</title>
    </Helmet>
    {loading ? (
        <div className="loading">Loading...</div> // <-- Show loading spinner or message
      ) : (
        <>
  {checkCalculate && <div>
     <div className='listformcontainer'>
           <form className='listform' onSubmit={handlelistformsubmit}>
            <div>
              <h1 className='listformheading'>List Your Items</h1>
        <p className='listformpara'>Please fill in the details of the items you want to list.</p>
            </div>
        <div className='listforminput'>
         <label htmlFor="item1_name" >
          <input name='item1_name' 
          value={Values.item1_name}
          onChange={handleChange}
          type='text' placeholder=' ' required/>
          <span>Item1 Name</span>
        </label>
         <label htmlFor="item1_price" >
          <input name='item1_price' 
          value={Values.item1_price}
          onChange={handleChange}
          type='text' placeholder=' ' required/>
          <span>Price</span>
        </label>
        </div>
        <div className='listforminput'>
         <label htmlFor="item2_name" >
          <input name='item2_name' 
          value={Values.item2_name}
          onChange={handleChange}
          type='text' placeholder=' '/>
          <span>Item2 Name</span>
        </label>
         <label htmlFor="item2_price" >
          <input name='item2_price' 
          value={Values.item2_price}
          onChange={handleChange}
          type='text' placeholder=' '/>
          <span>Price</span>
        </label>
        </div>
        <div className='listforminput'>
         <label htmlFor="item3_name" >
          <input name='item3_name' 
          value={Values.item3_name}
          onChange={handleChange}
          type='text' placeholder=' '/>
          <span>Item3 Name</span>
        </label>
         <label htmlFor="item3_price" >
          <input name='item3_price' 
          value={Values.item3_price}
          onChange={handleChange}
          type='text' placeholder=' '/>
          <span>Price</span>
        </label>
        </div>
        <div className='listforminput'>
         <label htmlFor="item4_name" >
          <input name='item4_name' 
          value={Values.item4_name}
          onChange={handleChange}
          type='text' placeholder=' '/>
          <span>Item4 Name</span>
        </label>
         <label htmlFor="item4_price" >
          <input name='item4_price' 
          value={Values.item4_price}
          onChange={handleChange}
          type='text' placeholder=' '/>
          <span>Price</span>
        </label>
        </div>
        <div className='listforminput'>
         <label htmlFor="item5_name" >
          <input name='item5_name' 
          value={Values.item5_name}
          onChange={handleChange}
          type='text' placeholder=' '/>
          <span>Item5 Name</span>
        </label>
         <label htmlFor="item5_price" >
          <input name='item5_price' 
          value={Values.item5_price}
          onChange={handleChange}
          type='text' placeholder=' '/>
          <span>Price</span>
        </label>
        </div>
         <div className='listforminput'>
         <label htmlFor="item6_name" >
          <input name='item6_name' 
          value={Values.item6_name}
          onChange={handleChange}
          type='text' placeholder=' '/>
          <span>Item6 Name</span>
        </label>
         <label htmlFor="item6_price" >
          <input name='item6_price' 
          value={Values.item6_price}
          onChange={handleChange}
          type='text' placeholder=' '/>
          <span>Price</span>
        </label>
        </div>
         <div className='listforminput'>
         <label htmlFor="item7_name" >
          <input name='item7_name' 
          value={Values.item7_name}
          onChange={handleChange}
          type='text' placeholder=' '/>
          <span>Item7 Name</span>
        </label>
         <label htmlFor="item7_price" >
          <input name='item7_price' 
          value={Values.item7_price}
          onChange={handleChange}
          type='text' placeholder=' '/>
          <span>Price</span>
        </label>
        </div>
         <div className='listforminput'>
         <label htmlFor="item8_name" >
          <input name='item8_name' 
          value={Values.item8_name}
          onChange={handleChange}
          type='text' placeholder=' '/>
          <span>Item8 Name</span>
        </label>
         <label htmlFor="item8_price" >
          <input name='item8_price' 
          value={Values.item8_price}
          onChange={handleChange}
          type='text' placeholder=' '/>
          <span>Price</span>
        </label>
        </div>
         <div className='listforminput'>
         <label htmlFor="item9_name" >
          <input name='item9_name' 
          value={Values.item9_name}
          onChange={handleChange}
          type='text' placeholder=' '/>
          <span>Item9 Name</span>
        </label>
         <label htmlFor="item9_price" >
          <input name='item9_price' 
          value={Values.item9_price}
          onChange={handleChange}
          type='text' placeholder=' '/>
          <span>Price</span>
        </label>
        </div>
         <div className='listforminput'>
         <label htmlFor="item10_name" >
          <input name='item10_name' 
          value={Values.item10_name}
          onChange={handleChange}
          type='text' placeholder=' '/>
          <span>Item10 Name</span>
        </label>
         <label htmlFor="item10_price" >
          <input name='item10_price' 
          value={Values.item10_price}
          onChange={handleChange}
          type='text' placeholder=' '/>
          <span>Price</span>
        </label>
        </div>
        <button type='submit' className='listformbtn'>Submit</button>
        <ToastContainer/>
        </form>
        <div>
        <GroupLists/>
        </div>
     </div>
  </div>}
  {!checkCalculate && <GroupForm /> }
  </>
)}
  </>
 

);};
