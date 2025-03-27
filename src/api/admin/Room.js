import useFetchData from 'src/hooks/use-fetch-data';

/**
 * START
 */
const API_URL = import.meta.env.VITE_SERVER_URL;

/**
 * Fetch faculty type
 */
export const fetchRoom = () => {
  return useFetchData(
    `${API_URL}/room/list?include_building=true&building_fields=ID,NAME&include_courses=true&course_fields=DESCRIPTION`
  );
};

/**
 * Create room
 */
export const createRoom = async (formData, formId) => {
  const method = formId ? 'PUT' : 'POST';
  const url = formId ? `${API_URL}/room/edit/${formId}` : `${API_URL}/room/create`;

  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error creating room');
  }

  return formId ? 'Room updated successfully!' : 'Room created successfully!';
};

/**
 * Fecth courses
 */
export const courseList = () => {
  return useFetchData(`${API_URL}/course/list?fields=ID,DESCRIPTION`);
};

/**
 * Fetch Campus
 */
export const campusList = () => {
  return useFetchData(`${API_URL}/campus/list?fields=ID,NAME`);
};

/**
 * Fecth Building
 */
export const buildingList = () => {
  return useFetchData(`${API_URL}/building/list?fields=ID,NAME`);
};
