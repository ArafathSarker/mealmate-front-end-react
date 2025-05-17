import React, { useEffect, useState } from 'react';
import { FaBangladeshiTakaSign } from "react-icons/fa6";
const GroupLists = () => {
    const [groupLists, setGroupLists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGroupLists = async () => {
            try {
                const name = localStorage.getItem("UserName");
       const groupuserres = await fetch(`http://127.0.0.1:3000/app/mealmate/api/data/groupuser`,{
        method:"post",
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          name
        })
      });
        const groupuserdata = await groupuserres.json();
                const response = await fetch('http://127.0.0.1:3000/app/mealmate/api/data/getlist', {
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

        fetchGroupLists();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div style={{ height: '100vh', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
            <h3>Group Lists</h3>
            {groupLists.length === 0 ? (
                <p>No lists found for this group.</p>
            ) : (
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {groupLists.map((list, index) => (
                        <li key={list._id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ddd' }}>
                            <strong>List {index + 1}</strong>
                            <ul>
                                {Object.entries(list).map(([key, value]) => {
                                    if (key.startsWith('item') && value?.name) {
                                        return (
                                            <li key={key}>
                                                {value.name} - <FaBangladeshiTakaSign/>{value.price}
                                            </li>
                                        );
                                    }
                                    return null;
                                })}
                            </ul>
                            <p><strong>Total Price:</strong> <FaBangladeshiTakaSign/>{list.totalPrice}</p>
                            <p><strong>Date:</strong>{list.CreatedOn}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default GroupLists;