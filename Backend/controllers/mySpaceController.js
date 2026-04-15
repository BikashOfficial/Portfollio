import Project from '../modules/projects.js';
import SkillGroup from '../modules/skills.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../config/cloudinary.js';
import fs from 'fs/promises';

// Middleware to verify admin key
export const verifyAdminKey = (req, res, next) => {
  const adminKey = req.headers['x-admin-key'];
  const validKey = process.env.ADMIN_KEY || 'your-secret-admin-key';
  
  if (!adminKey || adminKey !== validKey) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Invalid or missing admin key'
    });
  }
  
  next();
};

// Handle image upload to Cloudinary
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const folder = req.body.folder || 'general';
    const result = await uploadToCloudinary(req.file.path, folder);

    // Delete temporary file
    await fs.unlink(req.file.path);

    if (result.success) {
      res.status(200).json({
        success: true,
        message: 'Image uploaded successfully',
        data: {
          url: result.url,
          publicId: result.publicId
        }
      });
    } else {
      res.status(500).json({
        success: false,
        message: result.error || 'Error uploading image'
      });
    }

  } catch (error) {
    console.error('Error uploading image:', error);
    // Clean up uploaded file if it exists
    if (req.file) {
      try {
        await fs.unlink(req.file.path);
      } catch (e) {
        console.error('Error deleting temp file:', e);
      }
    }
    res.status(500).json({
      success: false,
      message: 'Error uploading image'
    });
  }
};

// Handle projects update
export const updateProjects = async (req, res) => {
  try {
    const { projects } = req.body;

    if (!projects || !Array.isArray(projects)) {
      return res.status(400).json({
        success: false,
        message: 'Projects must be an array'
      });
    }

    // Clear existing projects and insert new ones
    await Project.deleteMany({});
    
    const savedProjects = await Project.insertMany(projects);

    console.log(`${savedProjects.length} projects saved successfully`);

    res.status(200).json({
      success: true,
      message: 'Projects updated successfully',
      data: {
        count: savedProjects.length,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Error updating projects:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: messages
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || 'Error updating projects'
    });
  }
};

// Get all projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: projects,
      count: projects.length
    });

  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching projects'
    });
  }
};

// Handle skills update
export const updateSkills = async (req, res) => {
  try {
    const { skills } = req.body;

    if (!skills || !Array.isArray(skills)) {
      return res.status(400).json({
        success: false,
        message: 'Skills must be an array'
      });
    }

    // Clear existing skill groups and insert new ones
    await SkillGroup.deleteMany({});
    
    const savedSkills = await SkillGroup.insertMany(skills);

    console.log(`${savedSkills.length} skill groups saved successfully`);

    res.status(200).json({
      success: true,
      message: 'Skills updated successfully',
      data: {
        groups: savedSkills.length,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Error updating skills:', error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: messages
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || 'Error updating skills'
    });
  }
};

// Get all skills
export const getSkills = async (req, res) => {
  try {
    const skills = await SkillGroup.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: skills,
      count: skills.length
    });

  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching skills'
    });
  }
};
