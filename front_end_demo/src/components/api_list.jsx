
import React, { useState, useEffect } from 'react';


function List_reverse() {
  const input_array = [1, 2, 3, 4, 5];
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const data_opts = {
    method:'POST',
    headers: { 'Content-Type': 'application/json',Authorization: 'Bearer ' + sessionStorage.getItem('token') },
    body: JSON.stringify({user_list: input_array})
  }
    useEffect(() => {fetch('https://localhost:8080/api/v1/list_reverse_loop',data_opts)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setData(data);
      setLoading(false);
    })
    .catch(error => {
      setError(error);
      setLoading(false);
    });
  }, []);
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div align="left">
      <h1>Data from API:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default List_reverse;