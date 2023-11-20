// AthleteList.js
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// Contexts
import { AuthContext } from '../../contexts/AuthContext';
import { useModal, InfoModal } from '../../contexts/ModalContext';

// Components
import AthleteButton from './AthleteButton';

// Utils
// import { handleLogout } from '../../util/handleLogout';

// Styling
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Modal, Button } from 'react-bootstrap';

// Utilities
import { httpGET } from '../../util/apiServices';

const AthleteList = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const { showModal, closeModal } = useModal();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  const [activeOnly, setActiveOnly] = useState(true);
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
      console.log(
        '🚀 ~ file: AthleteList.jsx:48 ~ updateData ~ newData:',
        newData
      );
    };

    const fetchData = async () => {
      // 'athlete_list' is the specific key for the data in the response
      const response = await httpGET(
        'api/athletes',
        updateData,
        setLoading,
        'athlete_list'
      );

      // Handle errors and show modals
      if (response.error) {
        if (response.error === 'TokenExpiredError') {
          showModal(
            <InfoModal
              show={true}
              handleClose={closeModal}
              title="Token Expired"
              body={response.errorMsg}
              primaryAction={handleLogout}
            />
          );
        } else {
          // Other errors, eg. connection, server down, or DB down
          setErrorMsg(`${response.error.message}.  ${response.errorMsg}`);
          showModal(
            <InfoModal
              show={true}
              handleClose={closeModal}
              title={response.error.message}
              body={response.errorMsg}
              primaryAction={closeModal}
            />
          );
        }
      }
    };

    fetchData();
  }, []);

  // Render the Athlete components
  const athleteButtons = filteredData.map((athlete) => (
    <AthleteButton key={athlete._id} data={athlete} small={true} />
  ));

  // Logout if token expired
  const handleLogout = async () => {
    const loggedout = await httpGET('logout');
    if (loggedout.message === 'success') {
      console.log(
        '🚀 ~ file: Logout.jsx:11 ~ handleSubmit ~ logout:',
        loggedout.message
      );
      closeModal();
      logout();
      navigate('/login');
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : errorMsg ? (
        <p className="text-danger">{errorMsg}</p>
      ) : (
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
      )}
    </div>
  );
};

export default AthleteList;
