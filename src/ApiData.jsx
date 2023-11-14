// ApiData.js
import React, { useState } from 'react';

const ApiData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Replace 'https://api.example.com/data' with your API endpoint
      // Use http before security is set up
      const response = await fetch('http://127.0.0.1:3000/api');
      const result = await response.json();

      setData(result);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchData} disabled={loading}>
        {loading ? 'Fetching data...' : 'Fetch Data'}
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        data && (
          <div>
            <h2>Data from API:</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )
      )}
    </div>
  );
};

export default ApiData;
