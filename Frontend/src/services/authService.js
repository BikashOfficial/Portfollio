import apiClient from './api';

// Verify access code
export const verifyAccessCode = async (accessCode) => {
  try {
    const response = await apiClient.post('/auth/verify', { accessCode });
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Auth verification failed' };
  }
};

export default {
  verifyAccessCode
};
