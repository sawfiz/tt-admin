import axios from 'axios';

// Vite handles .env differently from create-react-app
const BASE_URL = import.meta.env.VITE_BASE_URL; // Set the base URL

export const httpRequest = async (
  method = 'GET',
  endpoint,
  data = null,
  filter = null
) => {
  try {
    const url = `${BASE_URL}${endpoint}${filter ? `?role=${filter}` : ''}`;
    const headers = constructHeaders(data);
    console.log("🚀 ~ file: apiServices.jsx:15 ~ headers:", headers)

    const options = {
      method,
      headers,
    };

    if (method !== 'GET' && data) {
      if (data instanceof FormData) {
        console.log('FormData');
        // If data is already FormData (for file uploads), use it directly
        options.body = data;
      } else {
        options.body = JSON.stringify(data);
      }
    }

    const response = await axios({
      method,
      url,
      data,
      headers: options.headers,
    });
    console.log('🚀 ~ file: apiServices.jsx:39 ~ response:', response);
    return response;
  } catch (error) {
    console.log('🚀 ~ file: apiServices.jsx:47 ~ error:', error);
    return {
      status: error.status || 500,
      error: error.name,
      message: error.message,
    };
  }
};

const constructHeaders = (data) => {
  const headers = {};

  if (data instanceof FormData) {
    headers['Content-Type'] = 'multipart/form-data';
  } else {
    headers['Content-Type'] = 'application/json';
  }

  // Set the JWT token in the headers with token saved in the localStorage
  const token = localStorage.getItem('token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

const throwError = (response, result) => {
  console.log(
    '🚀 ~ file: apiServices.jsx:57 ~ throwError ~ response:',
    response
  );
  console.log('🚀 ~ file: apiServices.jsx:57 ~ throwError ~ result:', result);
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
  console.log('🚀 ~ file: apiServices.jsx:69 ~ throwError ~ error:', error);
  throw error;
};
