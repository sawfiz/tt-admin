// Vite handles .env differently from create-react-app
const BASE_URL = import.meta.env.VITE_BASE_URL; // Set the base URL

export const getData = async (
  endpoint,
  setData,
  setLoading,
  dataKey = null
) => {
  try {
    if (setLoading) setLoading(true);

    const response = await fetch(`${BASE_URL}/${endpoint}`);
    const result = await response.json();
    // Check for a specific data key
    const data = dataKey ? result[dataKey] : result;
    if (setData) setData(data);
    if (setLoading) setLoading(false);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    if (setLoading) setLoading(false);
    throw error; // Re-throw the error for handling in components if needed
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
  } catch (error) { // General errors outside HTTP status codes
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
  } catch (error) { // General errors outside HTTP status codes
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
