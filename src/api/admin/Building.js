import useFetchData from 'src/hooks/use-fetch-data';
import { error } from 'src/theme/core';

/**
 * START
 */
const API_URL = import.meta.env.VITE_SERVER_URL;

/**
 * Fetch list
 */
export const fetchBuilding = () => {
  return useFetchData(`${API_URL}/building/list?include_campus=true&campus_fields=NAME,ID`);
};

/**
 * Create building
 */
export const createBuilding = async (data, buildingId) => {
  const method = buildingId ? 'PUT' : 'POST';
  const url = buildingId ? `${API_URL}/building/edit/${buildingId}` : `${API_URL}/building/create`;

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error submitting form');
  }

  return editMode ? 'Building updated successfully!' : 'Building created successfully!';
};

/**
 * Delete
 */
export const deleteBuilding = async (id) => {
  const response = await fetch(`${API_URL}/building/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error deleting building');
  }

  return 'Building deleted successfully!';
};
