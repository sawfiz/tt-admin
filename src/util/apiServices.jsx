// Vite handles .env differently from create-react-app
const BASE_URL = import.meta.env.VITE_BASE_URL // Set the base URL

export const fetchData = async (path, setData, setLoading, dataKey = null) => {
  try {
    setLoading(true);

    const response = await fetch(`${BASE_URL}/${path}`);
    const result = await response.json();
    // Check for a specific data key
    const data = dataKey ? result[dataKey] : result;
    setData(data);
    setLoading(false);
  } catch (error) {
    console.error('Error fetching data:', error);
    setLoading(false);
    throw error; // Re-throw the error for handling in components if needed
  }
};

export const postData = async (path, data) => {
  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to POST data.');
    }

    const result = await response.json();
    return result;

  } catch (error) {
    console.error('Error POST data:', error);
    throw new Error('Failed to POST data.');
  }
};