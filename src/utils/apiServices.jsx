// Vite handles .env differently from create-react-app
const BASE_URL = import.meta.env.VITE_BASE_URL; // Set the base URL

export const httpRequest = async (
  method = 'GET',
  endpoint,
  data = null,
  dataKey = null
) => {
  try {
    const url = `${BASE_URL}${endpoint}`;
    const headers = constructHeaders();

    const options = {
      method,
      headers,
    };

    if (method !== 'GET' && data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);

    const result = await response.json();
    if (!response.ok) throwError(response, result);

    if (method === 'GET' && dataKey) {
      return result[dataKey];
    } else {
      return result;
    }
  } catch (error) {
    return {
      status: error.status || 500,
      error: error.name,
      message: error.message,
    };
  }
};

const constructHeaders = () => {
  // Construct the GET request headers
  const headers = {
    'Content-Type': 'application/json',
  };
  // Set the JWT token in the headers with token saved in the localStorage
  const token = localStorage.getItem('token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

const throwError = (response, result) => {
  console.log('🚀 ~ file: apiServices.jsx:131 ~ throwError ~ result:', result);
  let message = result.message;
  if (response.status === 400) message = JSON.parse(result.error).errors;
  if (response.status === 409) message = 'Uername already in use.';
  if (response.status === 500)
    message = 'Server error, please contact support.';
  if (response.status === 401)
    message = 'Please check your username and password.';
  if (response.status === 403)
    message = 'Token timed out, please contact support.';

  const error = new Error(message || 'Failed to POST data.');
  error.name = result.error;
  error.status = response.status;
  throw error;
};
