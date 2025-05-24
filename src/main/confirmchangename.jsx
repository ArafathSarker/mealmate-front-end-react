import React,{useState} from 'react';
import '../style/confirmchangename.css';

export default function ConfirmChangeName({ onCancel, onConfirm ,fetchData}) {
    const [Values,setValues] = useState({
       groupname:'',
       });
      
        const handleChange = (e)=>{
           const {name,value} = e.target;
          setValues((prev)=>({
              ...prev,
              [name]:value   
          }));
    }
    fetchData(Values.groupname);
  return (
    
    <div className="modal-overlay">
      <div className="modal-content">
        <form className='changegroupnameform' onSubmit={(e)=>e.preventDefault()}>
         <label htmlFor="groupname" >
          <input name='groupname' 
          value={Values.groupname}
          onChange={handleChange}
          type='text' placeholder=' ' required/>
          <span>Name</span>
        </label>
        <div>
        <button onClick={onConfirm} className="confirm-btn">Update</button>
        <button onClick={onCancel} className="cancel-btn">Cancel</button>
        </div>
        </form>
      </div>
    </div>
  );
}