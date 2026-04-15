import dotenv from 'dotenv'
import fs from 'fs';
dotenv.config();
import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import contactRoutes from './routes/contact.js';
import mySpaceRoutes from './routes/mySpace.js';
import authRoutes from './routes/auth.js';

const app = express();

// Ensure uploads temp directory exists
if (!fs.existsSync('uploads')) fs.mkdirSync('uploads');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api', mySpaceRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Default route
app.get('/', (req, res) => {
  res.json({
    message: 'Portfolio Backend API',
    endpoints: {
      auth: 'POST /api/auth/verify (verify access code)',
      contact: 'POST /api/contact',
      projects: 'GET /api/projects, POST /api/projects/update (requires x-admin-key)',
      skills: 'GET /api/skills, POST /api/skills/update (requires x-admin-key)',
      health: 'GET /api/health'
    }
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
