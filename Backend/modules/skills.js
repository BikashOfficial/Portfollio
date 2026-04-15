import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide skill name'],
      trim: true,
      maxlength: [50, 'Skill name cannot exceed 50 characters']
    },
    icon: {
      type: String,
      default: '🔧',
      maxlength: [2, 'Icon should be a single character']
    }
  }
);

const skillGroupSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: [true, 'Please provide group label'],
      trim: true,
      maxlength: [50, 'Label cannot exceed 50 characters']
    },
    color: {
      type: String,
      default: '#c8ff00',
      validate: {
        validator: function(v) {
          return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(v);
        },
        message: 'Invalid color format'
      }
    },
    skills: {
      type: [skillSchema],
      required: [true, 'Please add at least one skill'],
      validate: {
        validator: (v) => Array.isArray(v) && v.length > 0,
        message: 'At least one skill is required'
      }
    }
  },
  { timestamps: true }
);

const SkillGroup = mongoose.model('SkillGroup', skillGroupSchema);

export default SkillGroup;