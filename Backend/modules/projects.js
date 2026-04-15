import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a project title'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    desc: {
      type: String,
      required: [true, 'Please provide a description'],
      maxlength: [500, 'Description cannot exceed 500 characters']
    },
    tech: {
      type: [String],
      required: [true, 'Please provide technologies used'],
      validate: {
        validator: (v) => Array.isArray(v) && v.length > 0,
        message: 'At least one technology is required'
      }
    },
    demo: {
      type: String,
      trim: true,
      validate: {
        validator: function(v) {
          return !v || /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(v);
        },
        message: 'Invalid demo URL'
      }
    },
    github: {
      type: String,
      trim: true,
      validate: {
        validator: function(v) {
          return !v || /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(v);
        },
        message: 'Invalid GitHub URL'
      }
    },
    img: {
      type: String,
      required: [true, 'Please provide an image'],
      validate: {
        validator: function(v) {
          return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(v);
        },
        message: 'Invalid image URL'
      }
    },
    accent: {
      type: String,
      default: '#c8ff00',
      validate: {
        validator: function(v) {
          return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(v);
        },
        message: 'Invalid color format'
      }
    },
    emoji: {
      type: String,
      default: '📦',
      maxlength: [2, 'Emoji should be a single character']
    }
  },
  { timestamps: true }
);

const Project = mongoose.model('Project', projectSchema);

export default Project;