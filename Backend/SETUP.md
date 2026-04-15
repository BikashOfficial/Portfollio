# Portfolio Backend Setup Guide

## Prerequisites

### 1. Install Required Dependencies

Add `multer` for file uploads:

```bash
npm install multer
```

All required packages are already listed in `package.json`:
- Express
- MongoDB/Mongoose
- Cloudinary
- CORS
- dotenv
- Multer (new)

### 2. MongoDB Setup

Make sure MongoDB is running locally or update the `MONGO_URI` in `.env` with your MongoDB Atlas connection string:

```
MONGO_URI=mongodb://localhost:27017/portfolio
```

### 3. Cloudinary Setup

Sign up for a free Cloudinary account at https://cloudinary.com

1. Go to your Cloudinary Dashboard
2. Copy your credentials:
   - Cloud Name
   - API Key
   - API Secret

3. Update `.env` with your Cloudinary credentials:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
ADMIN_KEY=your-secret-admin-key
```

### 4. Admin Key

Change the `ADMIN_KEY` in `.env` to a secure key:

```env
ADMIN_KEY=your-super-secret-admin-key
```

Use the same key in your frontend's `MySpace.jsx`:

```javascript
const API_KEY = 'your-super-secret-admin-key';
```

## Database Schemas

### Projects Schema
```javascript
{
  title: String (required),
  desc: String (required),
  tech: [String] (required),
  demo: String (URL),
  github: String (URL),
  img: String (Cloudinary URL, required),
  accent: String (hex color, default: '#c8ff00'),
  emoji: String (default: '📦'),
  createdAt: Date,
  updatedAt: Date
}
```

### Skills Schema
```javascript
{
  label: String (required),
  color: String (hex color, default: '#c8ff00'),
  skills: [
    {
      name: String (required),
      icon: String (default: '🔧')
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

## API Endpoints

### Public Endpoints

**Get All Projects**
```
GET /api/projects
```

**Get All Skills**
```
GET /api/skills
```

**Submit Contact Form**
```
POST /api/contact
Headers: Content-Type: application/json

Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'm interested in hiring..."
}
```

**Health Check**
```
GET /api/health
```

### Protected Endpoints (Require Admin Key)

All protected endpoints require the `x-admin-key` header:
```
Headers: {
  "Content-Type": "application/json",
  "x-admin-key": "your-secret-admin-key"
}
```

**Upload Image to Cloudinary**
```
POST /api/upload-image
Headers:
  - Content-Type: multipart/form-data
  - x-admin-key: your-secret-admin-key

Body (FormData):
  - image: [File]
  - folder: "projects" (optional, default: "general")

Response:
{
  "success": true,
  "data": {
    "url": "https://res.cloudinary.com/...",
    "publicId": "portfolio/projects/..."
  }
}
```

**Update All Projects**
```
POST /api/projects/update
Headers:
  - Content-Type: application/json
  - x-admin-key: your-secret-admin-key

Body:
{
  "projects": [
    {
      "title": "Project Name",
      "desc": "Description",
      "tech": ["React", "Node.js"],
      "demo": "https://demo-link.com",
      "github": "https://github-link.com",
      "img": "https://cloudinary-url.com/image.jpg",
      "accent": "#c8ff00",
      "emoji": "🎯"
    }
  ]
}
```

**Update All Skills**
```
POST /api/skills/update
Headers:
  - Content-Type: application/json
  - x-admin-key: your-secret-admin-key

Body:
{
  "skills": [
    {
      "label": "Frontend",
      "color": "#c8ff00",
      "skills": [
        {
          "name": "React.js",
          "icon": "⚛️"
        }
      ]
    }
  ]
}
```

## Running the Server

```bash
npm run app
```

The server will start on `http://localhost:5000`

## Frontend Integration

In your React frontend's `MySpace.jsx`, update:

```javascript
const API_URL = 'http://localhost:5000/api';
const API_KEY = 'your-super-secret-admin-key'; // Same as ADMIN_KEY in .env

// The save functions already handle uploading to these endpoints
```

## Folder Structure

```
uploads/         # Temporary folder for file uploads (created automatically)
config/
  ├── db.js
  └── cloudinary.js
controllers/
  ├── contactController.js
  └── mySpaceController.js
middleware/
  └── upload.js
modules/
  ├── projects.js
  └── skills.js
routes/
  ├── contact.js
  └── mySpace.js
app.js
```

## Troubleshooting

### Images not uploading?
- Verify Cloudinary credentials in `.env`
- Check that `multer` is installed
- Ensure `uploads/` folder exists

### Admin key not working?
- Verify the `x-admin-key` header is sent correctly
- Check that the key matches in both `.env` and frontend

### MongoDB connection error?
- Ensure MongoDB is running
- Verify `MONGO_URI` in `.env`
- Check database user credentials if using MongoDB Atlas

### CORS errors?
- CORS is already enabled in `app.js`
- Verify frontend URL matches or adjust CORS settings
