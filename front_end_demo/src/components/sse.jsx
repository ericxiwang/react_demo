import React, { useEffect, useState } from 'react';

function SSE() {
  const [data, setData] = useState({});

  useEffect(() => {
    const eventSource = new EventSource('https://localhost:8080/api/v1/sse'); // Replace with your Flask server URL

    eventSource.onopen = () => {
      console.log('SSE connection opened.');
    };

    eventSource.onmessage = (event) => {
      const eventData = JSON.parse(event.data);
      setData(eventData);
    };

    eventSource.onerror = (error) => {
      console.error('SSE Error:', error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <h1>Server-Sent Events Example</h1>
      <p>Current Time: {data.time}</p>
      <p>Message: {data.message}</p>
    </div>
  );
}

export default SSE;