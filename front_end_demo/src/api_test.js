import React, { useState, useEffect } from 'react';

function API_TEST() {
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://localhost:8080/api/v1/test') 
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setApiData(data))
      .catch(error => {
        console.error("Error fetching data:", error);
        setError(error.message);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Flask API Example</h1>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {apiData ? (
          <div>
            <p>Message: {apiData.message}</p>
            <p>Value: {apiData.value}</p>
          </div>
        ) : (
          <p>Loading data from Flask...</p>
        )}
      </header>
    </div>
  );
}

export default API_TEST;