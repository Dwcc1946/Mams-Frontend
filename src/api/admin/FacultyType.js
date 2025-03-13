import useFetchData from 'src/hooks/use-fetch-data';

/**
 * START
 */
const API_URL = import.meta.env.VITE_SERVER_URL;

/**
 * Fetch faculty type
 */
export const fetchFacultyType = () => {
  return useFetchData(`${API_URL}/faculty_type/list`);
};

/**
 * Create faculty type
 */
export const createFacultyType = async (formData, editMode) => {
  const method = editMode ? 'PUT' : 'POST';
  const url = editMode ? `${API_URL}/faculty_type/edit` : `${API_URL}/faculty_type/create`;

  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error creating faculty type');
  }

  return editMode ? 'Faculty type updated successfully!' : 'Faculty type created successfully!';
};
