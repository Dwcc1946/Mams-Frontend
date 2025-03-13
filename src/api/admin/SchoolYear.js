import useFetchData from 'src/hooks/use-fetch-data';

/**
 * START
 */
const API_URL = import.meta.env.VITE_SERVER_URL;

/**
 * Fetch school year list
 */
export const fetchSchoolYear = () => {
  return useFetchData(`${API_URL}/school_year/list`);
};

/**
 * Create school year
 */
export const createSchoolYear = async (formData, editMode) => {
  const method = editMode ? 'PUT' : 'POST';
  const url = editMode ? `${API_URL}/school_year/edit` : `${API_URL}/school_year/create`;

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error submitting form');
  }

  return editMode ? 'Form updated successfully!' : 'Form submitted successfully!';
};

/**
 * Delete school year
 */
export const deleteSchoolYear = async (code) => {
  const response = await fetch(`${API_URL}/school_year/delete/${code}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error deleting SY');
  }

  return 'SY deleted successfully!';
};

/**
 * Make present
 */
export const makePresentSY = async (code) => {
  const response = await fetch(`${API_URL}/school_year/make-present`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ code }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error update');
  }

  return 'SY updated successfully!';
};
