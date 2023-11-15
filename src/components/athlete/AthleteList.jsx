// AthleteList.js
import { useState, useEffect } from 'react';

// Components
import AthleteButton from './AthleteButton';

// Styling
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

// Utilities
import { getData } from '../../util/apiServices';

const AthleteList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeOnly, setActiveOnly] = useState(false);
  const [selectedGender, setSelectedGender] = useState(null);
  const [searchText, setSearchText] = useState('');

  const handleSearch = (e) => {
    const text = e.target.value.toLowerCase();
    setSearchText(text);
  };

  // Filter athletes based on searchText, activeOnly and selectedGender
  const filteredData = data.filter((athlete) => {
    const { name, gender, active } = athlete;

    const nameIncludesText = name.toLowerCase().includes(searchText);
    const isGenderMatch = !selectedGender || selectedGender === gender;
    const isActiveMatch = !activeOnly || active === activeOnly;

    return nameIncludesText && isGenderMatch && isActiveMatch;
  });

  useEffect(() => {
    const updateData = (newData) => {
      setData(newData); // Function to update 'data' state
    };

    const getDataFromAPI = async () => {
      try {
        await getData('api/athletes', updateData, setLoading, 'athlete_list');
        // 'athlete_list' is the specific key for the data in the response
      } catch (error) {
        // Handle error if needed
      }
    };

    getDataFromAPI();
  }, []);

  // Render the Athlete components
  const athleteButtons = filteredData.map((athlete) => (
    <AthleteButton key={athlete._id} data={athlete} small={true} />
  ));

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        data && (
          <div>
            <h3>Athletes</h3>

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
                  <option value="">Boys & Girls</option>
                  <option value="male">Boys</option>
                  <option value="female">Girls</option>
                </select>
              </div>
            </div>

            {/* Filtered athlete list */}
            <div className="grid grid-cols-2 gap-[10px] md:grid-cols-3 lg:grid-cols-4 mb-4">
              {athleteButtons}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default AthleteList;
