// Libraries
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import DynamicButton from './DynamicButton';

// Contexts
import { AuthContext } from '../contexts/AuthContext';
import { useModal, InfoModal } from '../contexts/ModalContext';

// Utilities
import { httpRequest } from '../utils/apiServices';

// Styling
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const DynamicList = ({
  fetchDataFunction,
  dataKey,
  // buttonComponent,
  filterOptions,
}) => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const { showModal, closeModal } = useModal();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  const [activeOnly, setActiveOnly] = useState(true);
  const [selectedGender, setSelectedGender] = useState(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchDataFunction();
        if (response.error) {
          setErrorMsg(`${response.error} ${response.errorMsg}`);
          // Handle errors
          showModal(
            <InfoModal
              show={true}
              handleClose={closeModal}
              title={response.error}
              body={response.message}
              primaryAction={
                response.status === 403 ? handleLogout : closeModal
              }
            />
          );
        } else {
          setData(response[dataKey]);
        }
      } catch (error) {
        setErrorMsg(error.message || 'An error occurred');
        // Handle error
      }
      setLoading(false);
    };

    fetchData();
  }, [fetchDataFunction, dataKey]);

  // Logout if token expired
  const handleLogout = async () => {
    await httpRequest('POST', '/logout');
    closeModal();
    logout();
    navigate('/login');
  };

  const handleSearch = (e) => {
    const text = e.target.value.toLowerCase();
    setSearchText(text);
  };

  const filterData = (item) => {
    const nameIncludesText = item.name.toLowerCase().includes(searchText);
    const isGenderMatch = !selectedGender || selectedGender === item.gender;
    const isActiveMatch = !activeOnly || item.active === activeOnly;

    return nameIncludesText && isGenderMatch && isActiveMatch;
  };

  const filteredData = data ? data.filter(filterData) : [];

  const buttons = filteredData.map((item) => (
    // <DynamicButton key={item._id} data={item} component={buttonComponent} />
    <DynamicButton key={item._id} data={item} />
  ));

  console.log("Dynamic List");

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : errorMsg ? (
        <p className="text-danger">{errorMsg}</p>
      ) : (
        data && (
          <div>
            <h3>{dataKey}</h3>

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
                  <option value="">M & F</option>
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

export default DynamicList;
