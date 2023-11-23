// AthleteList.js
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import AthleteButton from './AthleteButton';

// Contexts
import { AuthContext } from '../../contexts/AuthContext';
import { useModal, InfoModal } from '../../contexts/ModalContext';

// Utilities
import { httpGET, httpPOST } from '../../utils/apiServices';

// Styling
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const AthleteList = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const { showModal, closeModal } = useModal();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  const [activeOnly, setActiveOnly] = useState(true);
  const [selectedGender, setSelectedGender] = useState(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      // 'athlete_list' is the specific key for the data in the response
      const response = await httpGET('api/athletes', 'athlete_list');

      if (response.error) {
        // Display the model. If error is token timed out, click on button logs the user out.
        showModal(
          <InfoModal
            show={true}
            handleClose={closeModal}
            title={response.error}
            body={response.message}
            primaryAction={response.status === 403 ? handleLogout : closeModal}
          />
        );
        setErrorMsg(`${response.error} ${response.errorMsg}`);
      } else {
        setData(response);
      }
    };

    fetchData();
    setLoading(false);
  }, []);

  // Logout if token expired
  const handleLogout = async () => {
    const loggedout = await httpPOST('logout');
    if (!loggedout) {
      // Handle error and show modal
      showModal(
        'Connection Error',
        'Error connecting to the server.  Please contact support.',
        closeModal
      );
    }
    closeModal();
    logout();
    navigate('/login');
  };

  const handleSearch = (e) => {
    const text = e.target.value.toLowerCase();
    setSearchText(text);
  };

  // Filter athletes based on searchText, activeOnly and selectedGender
  const filteredData = data
    ? data.filter((athlete) => {
        const { name, gender, active } = athlete;

        const nameIncludesText = name.toLowerCase().includes(searchText);
        const isGenderMatch = !selectedGender || selectedGender === gender;
        const isActiveMatch = !activeOnly || active === activeOnly;

        return nameIncludesText && isGenderMatch && isActiveMatch;
      })
    : null;

  // Render the Athlete components
  const athleteButtons = filteredData
    ? filteredData.map((athlete) => (
        <AthleteButton key={athlete._id} data={athlete} small={true} />
      ))
    : null;

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : errorMsg ? (
        <p className="text-danger">{errorMsg}</p>
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
