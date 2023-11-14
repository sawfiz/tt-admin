// AthleteList.js
import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

const AthleteList = () => {
  // Fetch athlete data and manage state here
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Replace 'https://api.example.com/data' with your API endpoint
      // Use http before security is set up
      const response = await fetch('http://127.0.0.1:3000/api/athletes');
      const result = await response.json();
      const dataArray = result.athlete_list
      setData(dataArray);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        data && (
          <div>
            <h2>Athletes</h2>
            <ul>
              {data.map((item, index) => (
                <li key={index}>
                  {item._id}a
                  {JSON.stringify(item)}
                </li>
              ))}
            </ul>
          </div>
        )
      )}
    </div>
  );
};

export default AthleteList;
