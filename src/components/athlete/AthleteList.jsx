// AthleteList.js
import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';


import { fetchData } from '../../util/apiServices';

const AthleteList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateData = newData => {
      setData(newData); // Function to update 'data' state
    };

    const fetchDataFromAPI = async () => {
      try {
        await fetchData('api/athletes', updateData, setLoading, 'athlete_list');
        // 'athlete_list' is the specific key for the data in the response
      } catch (error) {
        // Handle error if needed
      }
    };

    fetchDataFromAPI();
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
                  <Link to={`/athlete/${item._id}`}>
                    {item.first_name} {item.last_name}
                    </Link>
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
