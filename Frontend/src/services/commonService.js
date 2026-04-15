import apiClient from './api';

// Submit contact form
export const submitContactForm = async (contactData) => {
  try {
    const response = await apiClient.post('/contact', contactData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to submit contact form' };
  }
};

// Health check
export const healthCheck = async () => {
  try {
    const response = await apiClient.get('/health');
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Server is not responding' };
  }
};

export default {
  submitContactForm,
  healthCheck
};
