import apiClient from './api';

// Get all projects
export const getProjects = async () => {
  try {
    const response = await apiClient.get('/projects');
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to fetch projects' };
  }
};

// Update all projects
export const updateProjects = async (projects) => {
  try {
    const response = await apiClient.post('/projects/update', { projects });
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to update projects' };
  }
};

// Upload image to Cloudinary
export const uploadProjectImage = async (file, folder = 'projects') => {
  try {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('folder', folder);

    const response = await apiClient.post('/upload-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to upload image' };
  }
};

export default {
  getProjects,
  updateProjects,
  uploadProjectImage
};
