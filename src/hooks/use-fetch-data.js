import { useEffect, useState, useCallback } from 'react';

const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Error fetching data');
      }

      const result = await response.json();
      setData(result);
      console.log('Data fetched:', result); // Log fetched data
    } catch (err) {
      setError(err.message || 'Something went wrong');
      console.error('Fetch error:', err); // Log any errors
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData }; // Return the refetch function
};

export default useFetchData;
