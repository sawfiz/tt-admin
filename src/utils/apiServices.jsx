// Vite handles .env differently from create-react-app
const BASE_URL = import.meta.env.VITE_BASE_URL; // Set the base URL

export const httpGET = async (
  endpoint, // API endpoint
  dataKey = null // For getting specific data
) => {
  try {
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
    console.log('🚀 ~ file: apiServices.jsx:29 ~ result:', result);

    if (!response.ok) {
      // Throw errors
      if (result.status === 403) {
        throw {
          name: result.error,
          message: 'Your session has expired. Pleae login again.',
        };
      }

      if (result.status === 500) {
        throw {
          name: 'Database error',
          message: 'Error fetching data.  Please contact support.',
        };
      }

      throw {
        name: result.error,
        message: 'Other errors',
      };
    }
    // Check for a specific data key
    const data = dataKey ? result[dataKey] : result;
    return data;
  } catch (error) {
    console.log('🚀 ~ file: apiServices.jsx:58 ~ error:', error);
    // return what was thrown in try
    return {
      error: error.name,
      errorMsg: error.message, // error contains the message already
    };
    // }
  }
};

export const httpPOST = async (endpoint, data, setLoading) => {
  try {
    // Allow the calling component to display e.g.,"Loading..."
    if (setLoading) setLoading(true);

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (setLoading) setLoading(false);

    const result = await response.json();
    // Check if status on successful (outside 200-299)
    if (!response.ok) {
      // Handle validation errors
      if (response.status === 400) {
        return { errors: result.errors };
      }

      // Handle username in use error
      if (response.status === 409) {
        return { error: result.error, errorMsg: 'Please try again.' };
      }

      // Handle database connection error
      if (response.status === 500) {
        return { error: result.error, errorMsg: 'Please constact support.' };
      }

      // Other errors
      console.log(result);
      throw new Error('Failed to POST data.');
    }
    // response is OK, i.e., in 200-299, return success message
    return result;
  } catch (error) {
    // General errors outside HTTP status codes
    if (setLoading) setLoading(false);
    return { error: 'Connection failed', errorMsg: 'Please constact support.' };
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
