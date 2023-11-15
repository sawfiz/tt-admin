// Libraries
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { fetchData } from '../../util/apiServices';

// Styling
import { Button } from 'react-bootstrap';

export default function AthleteDetails() {
  const { id } = useParams();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateData = (newData) => {
      setData(newData); // Function to update 'data' state
    };

    const fetchDataFromAPI = async () => {
      try {
        await fetchData(`api/athlete/${id}`, updateData, setLoading, 'athlete');
        // 'athlete' is the specific key for the data in the response
      } catch (error) {
        // Handle error if needed
      }
    };

    fetchDataFromAPI();
  }, [id]); // Include id as it is used in the useEffect

  const imgSrc =
    data.photoURL ||
    (data.gender === 'male'
      ? '/images/boy.png'
      : data.gender === 'female'
      ? '/images/girl.png'
      : '/images/unknown.png');

  return (
    <main>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          data && (
            <div>
              {/* Athlete full name */}
              <h2 className="mt-24 font-bold text-xl">{data.name}</h2>
              {/* Profile photo */}
              <div className=" absolute top-4 right-[0.5rem] w-28 h-28 overflow-hidden">
                <img
                  className="w-full h-full object-center object-cover rounded-lg "
                  src={imgSrc}
                  alt="profile"
                />
              </div>
              {/* Personal details */}
              <div className="outline-dashed outline-2 outline-pink-300 p-2 grid grid-cols-[1fr_2fr] my-2">
                <div className=" font-bold">Active</div>
                <div>{data.active ? '✅' : '❌'}</div>
                <div className=" font-bold">Gender</div>
                <div>{data.gender}</div>
                <div className=" font-bold">Birthdate</div>
                <div>{data.birthdate_yyyy_mm_dd}</div>
                <div className=" font-bold">Mobile</div>
                <div>{data.mobile}</div>
                <div className=" font-bold">Email</div>
                <div>{data.email}</div>
                <div className=" font-bold">School</div>
                <div>{data.school}</div>
                <div className=" font-bold">Father</div>
                <div>{data.father}</div>
                <div className=" font-bold">Mother</div>
                <div>{data.mother}</div>
              </div>

              {/* Buttons */}
              <div className="flex justify-around">
                <Link to={`/athlete/update/${id}`}>
                  <Button variant="primary">Update</Button>
                </Link>
                <Button variant="danger">Delete</Button>
              </div>
            </div>
          )
        )}
      </div>
    </main>
  );
}
