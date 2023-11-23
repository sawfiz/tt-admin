// Vite handles .env differently from create-react-app
const BASE_URL = import.meta.env.VITE_BASE_URL; // Set the base URL

export const httpGET = async (
  endpoint, // API endpoint
  dataKey = null // For getting specific data
) => {
  try {
    // The GET API call
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      headers: constructHeaders(),
    });
    const result = await response.json();

    if (!response.ok) throwError(response, result);

    // Check for a specific data key
    const data = dataKey ? result[dataKey] : result;
    return data;
  } catch (error) {
    return {
      status: error.status || 500,
      error: error.name,
      message: error.message,
    };
  }
};

export const httpPOST = async (endpoint, data) => {
  try {
    // the POST API call
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: constructHeaders(),
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) throwError(response, result);

    return result;
  } catch (error) {
    // return what was thrown in try
    return {
      status: error.status || 500,
      error: error.name,
      message: error.message,
    };
  }
};

export const httpPUT = async (endpoint, data) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: constructHeaders(),
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) throwError(response, result);

    return result;
  } catch (error) {
    // return what was thrown in try
    return {
      status: error.status || 500,
      error: error.name,
      message: error.message,
    };
  }
};

export const httpDELETE = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: constructHeaders(),
    });

    const result = await response.json();

    if (!response.ok) throwError(response, result);

    return result;
  } catch (error) {
    // return what was thrown in try
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
