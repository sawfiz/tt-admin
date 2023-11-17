// AthleteList.js
import { useState, useEffect } from 'react';

// Components
import UserButton from './UserButton';

// Styling
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

// Utilities
import { getData } from '../../util/apiServices';

const UserList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeOnly, setActiveOnly] = useState(true);
  const [selectedGender, setSelectedGender] = useState(null);
  const [searchText, setSearchText] = useState('');

  const handleSearch = (e) => {
    const text = e.target.value.toLowerCase();
    setSearchText(text);
  };

  // Filter athletes based on searchText, activeOnly and selectedGender
  const filteredData = data.filter((athlete) => {
    const { username, gender, active } = athlete;

    const usernameIncludesText = username.toLowerCase().includes(searchText);
    const isGenderMatch = !selectedGender || selectedGender === gender;
    const isActiveMatch = !activeOnly || active === activeOnly;

    return usernameIncludesText && isGenderMatch && isActiveMatch;
  });

  useEffect(() => {
    const updateData = (newData) => {
      setData(newData); // Function to update 'data' state
      console.log("🚀 ~ file: AthleteList.jsx:41 ~ updateData ~ newData:", newData)
    };

    const getDataFromAPI = async () => {
      try {
        await getData('api/users', updateData, setLoading, 'user_list');
        // 'athlete_list' is the specific key for the data in the response
      } catch (error) {
        // Handle error if needed
      }
    };

    getDataFromAPI();
  }, []);

  // Render the Athlete components
  const buttons = filteredData.map((item) => (
    <UserButton key={item._id} data={item} small={true} />
  ));

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        data && (
          <div>
            {/* <h3>Athletes</h3> */}

            {/* Search athlete based on name */}
            <InputGroup className="mb-3">
              <InputGroup.Text>🔍</InputGroup.Text>
              <Form.Control
                autoFocus
                placeholder="Name"
                value={searchText}
                onChange={handleSearch}
              />
            </InputGroup>

            {/* Active and gender filters */}
            <div className="flex justify-around items-center my-3">
              {/* Checkbox for active athletes only */}
              <div>
                <input
                  type="checkbox"
                  checked={activeOnly}
                  onChange={(e) => setActiveOnly(e.target.checked)}
                />{' '}
                <span className="text-slate-800">Active only </span>
              </div>

              {/* Filter athletes based on gender */}
              <div>
                <select
                  type=""
                  onChange={(e) => setSelectedGender(e.target.value)}
                >
                  <option value="">Male & Female</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            {/* Filtered athlete list */}
            <div className="grid grid-cols-2 gap-[10px] md:grid-cols-3 lg:grid-cols-4 mb-4">
              {buttons}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default UserList;
