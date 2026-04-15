import apiClient from './api';

// Get all skills
export const getSkills = async () => {
  try {
    const response = await apiClient.get('/skills');
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to fetch skills' };
  }
};

// Update all skills
export const updateSkills = async (skills) => {
  try {
    const response = await apiClient.post('/skills/update', { skills });
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to update skills' };
  }
};

export default {
  getSkills,
  updateSkills
};
