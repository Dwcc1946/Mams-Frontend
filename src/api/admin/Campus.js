import useFetchData from 'src/hooks/use-fetch-data';

/**
 * START
 */
const API_URL = import.meta.env.VITE_SERVER_URL;

/**
 * Fetched list
 */
export const fetchCampus = () => {
  return useFetchData(`${API_URL}/campus/list?include_r_user=true&r_user_fields=ID,FNAME,LNAME`);
};

/**
 * Create
 */
export const createCampus = async (campusdata, campusId) => {
  const method = campusId ? 'PUT' : 'POST';
  const url = campusId ? `${API_URL}/campus/edit/${campusId}` : `${API_URL}/campus/create`;

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(campusdata),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error creating campus');
  }

  return 'Campus created successfully';
};

/**
 * Delete Campus
 */
export const deleteCampus = async (id) => {
  const response = await fetch(`${API_URL}/campus/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error deleting campus');
  }

  return 'Campus deleted successfully!';
};

/**
 * Fetch users
 */
export const directorOptions = () => {
  return useFetchData(`${API_URL}/user/list?fields=ID,FNAME,LNAME`);
};
