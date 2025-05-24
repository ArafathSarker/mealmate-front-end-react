
import React, { useEffect,useState } from 'react';
import '../style/confirmdue.css';
import { FaBangladeshiTakaSign } from "react-icons/fa6";
export default function ConfirmDue({ onCancel}) {
const [groupLists, setGroupLists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
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
                const response = await fetch(import.meta.env.VITE_API_LINK +'data/fetchuser', {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ groupId:groupuserdata.group}), 
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch group lists');
                }

                const data = await response.json();
                setGroupLists(data.data); 
                setLoading(false);
            } catch (err) {
                setError(err.message || 'Error fetching group lists');
                setLoading(false);
            }
        };

        fetchUsers();
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
          <div style={{overflowY: 'auto', padding: '10px' }}>
                    <h3 style={{marginBottom:"1rem"}}>Due List</h3>
                    {groupLists.length === 0 ? (
                        <p>No User found</p>
                    ) : (
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            {groupLists.map((list, index) => (
                                <li key={list._id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ddd' }}>
                                    <div style={{
                                        display:"flex"
            
                                    }}>
                                        <strong>{index + 1}.</strong>
                                        <p><strong>{list.name}-<span 
                                        style={{color:"red"}}
                                        >{list.due}<FaBangladeshiTakaSign/></span></strong></p>
                                        </div>
                                     </li>
                            ))}
                        </ul>
                    )}
                </div>
        <button onClick={onCancel} className="confirm-btn">ok</button>
      </div>
    </div>
  );
}