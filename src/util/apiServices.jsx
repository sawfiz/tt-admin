// Vite handles .env differently from create-react-app
const BASE_URL = import.meta.env.VITE_BASE_URL // Set the base URL

export const fetchData = async (endpoint, setData, setLoading, dataKey = null) => {
  try {
    setLoading(true);

    const response = await fetch(`${BASE_URL}/${endpoint}`);
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