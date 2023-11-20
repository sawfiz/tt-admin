// Vite handles .env differently from create-react-app
const BASE_URL = import.meta.env.VITE_BASE_URL; // Set the base URL

export const httpGET = async (
  endpoint, // API endpoint
  setData, // For setting `data` state variable
  setLoading, // For setting `loading` state variable
  dataKey = null // For getting specific data
) => {
  try {
    // Allow the calling component to display e.g.,"Loading..."
    if (setLoading) setLoading(true);

    // Construct the GET request headers
    const headers = {
      'Content-Type': 'application/json',
    };
    // Set the JWT token in the headers with token saved in the localStorage
    const token = localStorage.getItem('token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // The GET API call
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      headers: headers,
    });
    const result = await response.json();
    console.log(response.status);
    console.log('🚀 ~ file: apiServices.jsx:29 ~ result:', result);
    // Allow the calling component to stop displaying, e.g. "Loading"
    if (setLoading) setLoading(false);

    if (!response.ok) {
      if (setData) setData([]);

      if (response.status === 403) {
        return {
          error: result.name,
          errorMsg: 'Your session has expired. Pleae login again.',
        };
      }

      if (response.status === 500) {
        console.log('I am here!');
        return {
          error: result.error,
          errorMsg: 'Error fetching data.  Please contact support.',
        };
      }
    }

    // Check for a specific data key
    const data = dataKey ? result[dataKey] : result;
    if (setData) setData(data);

    return data;
  } catch (error) {
    if (setLoading) setLoading(false);
    return {
      error,
      errorMsg: 'Pleaes contact support.',
    };
  }
};

export const postData = async (endpoint, data) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    // Check if status on successful (outside 200-299)
    if (!response.ok) {
      // Check if backend validation failed, 400
      if (response.status === 400) {
        // throw new Error(JSON.stringify(result.errors));
        // return with error messages
        return result;
      }
      // Other errors
      throw new Error('Failed to POST data.');
    }
    // response is OK, i.e., in 200-299, return success message
    return result;
  } catch (error) {
    // General errors outside HTTP status codes
    console.error('Error POST data:', error);
    throw new Error('Failed to POST data.');
  }
};

export const putData = async (endpoint, data) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    // Check if status on successful (outside 200-299)
    if (!response.ok) {
      // Check if backend validation failed, 400
      if (response.status === 400) {
        // throw new Error(JSON.stringify(result.errors));
        // return with error messages
        return result;
      }
      // Other errors
      throw new Error('Failed to POST data.');
    }
    // response is OK, i.e., in 200-299, return success message
    return result;
  } catch (error) {
    // General errors outside HTTP status codes
    console.error('Error POST data:', error);
    throw new Error('Failed to POST data.');
  }
};

export const deleteData = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(
      '🚀 ~ file: apiServices.jsx:71 ~ deleteData ~ response:',
      response
    );

    // Handling for a successful deletion with 204 status code
    if (response.status === 204) {
      return { success: true };
    }

    if (!response.ok) {
      throw new Error('Failed to DELETE data.');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error DELETE data:', error);
    throw new Error('Failed to DELETE data.');
  }
};
