import useFetchData from 'src/hooks/use-fetch-data';

/**
 * START
 */
const API_URL = import.meta.env.VITE_SERVER_URL;

/**
 * Fetch sem list
 */
export const fetchSem = () => {
  return useFetchData(`${API_URL}/create_sem/list`);
};

/**
 * Create Sem
 */
export const createSem = async (formData) => {
  const response = await fetch(`${API_URL}/create_sem/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error creating sem');
  }

  return 'Semester created successfully!';
};

/**
 * Make present
 */

export const makePresentSem = async (id) => {
  const response = await fetch(`${API_URL}/create_sem/make-present`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error updating sem');
  }

  return 'Sem updated successfully!';
};

/**
 * Delete sem
 */
export const deleteSem = async (id) => {
  const response = await fetch(`${API_URL}/create_sem/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error deleting sem');
  }

  return 'Sem deleted successfully!';
};
