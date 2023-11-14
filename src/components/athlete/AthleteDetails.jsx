// Libraries
import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { fetchData } from '../../util/apiServices';

export default function AthleteDetails() {
  const { id } = useParams();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateData = newData => {
      console.log(newData);
      setData(newData); // Function to update 'data' state
    };

    const fetchDataFromAPI = async () => {
      try {
        await fetchData(`api/athlete/${id}`, updateData, setLoading, "athlete");
        // 'athlete_list' is the specific key for the data in the response
      } catch (error) {
        // Handle error if needed
      }
    };

    fetchDataFromAPI();
  }, []);

  return <main>
    <h1> Athlete Details</h1>
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        data && (
          <div>
            {data.first_name}
          </div>
        )
      )}
    </div>
  </main>;
}
