import useFetchData from 'src/hooks/use-fetch-data';

/**
 * START
 */
const API_URL = import.meta.env.VITE_SERVER_URL;

/**
 * Fetch user list
 */
export const fetchUserList = () => {
  return useFetchData(`${API_URL}/user/list?include_r_account=true`);
};

/**
 * Deactivate user
 */
export const deactivateUser = async (id) => {
  const response = await fetch(`${API_URL}/user/deactivate/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error deactivating user');
  }

  return 'User deactivated successfully!';
};

/**
 * Activate user
 */
export const activateUser = async (id) => {
  const response = await fetch(`${API_URL}/user/activate/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error activating user');
  }

  return 'User activated successfully!';
};

/**
 * Create user
 */
export const submitUserForm = async (data, userId) => {
  const method = userId ? 'PUT' : 'POST';
  const url = userId ? `${API_URL}/user/edit/${userId}` : `${API_URL}/user/create`;

  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error submitting form');
  }

  return userId ? 'Form updated successfully!' : 'Form submitted successfully!';
};

/**
 * Campus assignment
 */
export const facultyAssignment = async (data, id) => {
  const response = await fetch(`${API_URL}/user/assign/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error submitting form');
  }

  return 'Faculty assigned successfully!';
};

/**
 * Change password
 */
export const changePassword = async (data, id) => {
  const response = await fetch(`${API_URL}/user/change_pass/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error changing password');
  }

  return 'Password changed successfully!';
};

/**
 * List campus options
 */
export const campusAssignList = () => {
  return useFetchData(`${API_URL}/campus/list?fields=ID,NAME`);
};

/**
 * List faculty type options
 */
export const facultyTypeList = () => {
  return useFetchData(`${API_URL}/faculty_type/list?fields=ID,DESCRIPTION`);
};

/**
 * List department option
 */
export const departmentList = () => {
  return useFetchData(`${API_URL}/department/list?fields=ID,NAME`);
};
