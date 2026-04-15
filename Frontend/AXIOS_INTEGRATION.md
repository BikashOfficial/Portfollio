# Frontend-Backend Integration with Axios

## Overview

The frontend has been fully integrated with the backend using axios. All API calls are now centralized in service files for better maintainability.

## Service Architecture

### 1. **api.js** - Base Axios Configuration
```javascript
// Location: src/services/api.js
- Creates configured axios instance
- Automatically adds admin key header to protected requests
- Includes response interceptors for error handling
```

### 2. **authService.js** - Authentication
```javascript
// Location: src/services/authService.js
- verifyAccessCode(code) - Verify access code for MySpace
```

### 3. **projectService.js** - Projects Management
```javascript
// Location: src/services/projectService.js
- getProjects() - Fetch all projects from database
- updateProjects(projects) - Save projects to database
- uploadProjectImage(file, folder) - Upload image to Cloudinary
```

### 4. **skillService.js** - Skills Management
```javascript
// Location: src/services/skillService.js
- getSkills() - Fetch all skills from database
- updateSkills(skills) - Save skills to database
```

### 5. **commonService.js** - Common Endpoints
```javascript
// Location: src/services/commonService.js
- submitContactForm(data) - Submit contact form
- healthCheck() - Check server status
```

## Updated Components

### ✅ AccessCodeGate.jsx
- Now uses `verifyAccessCode()` from authService
- Verifies code with backend before allowing access
- Shows loading state while verifying

### ✅ MySpace.jsx
- Uses `getProjects()` and `getSkills()` to fetch data
- Falls back to local data files if API fails
- Uses `updateProjects()` and `updateSkills()` to save data
- Displays error messages if something goes wrong

### ✅ Contact.jsx
- Uses `submitContactForm()` from commonService
- Cleaner code using axios service

## How to Use

### 1. **Starting the Backend**

```bash
cd Backend
npm install
npm run app
```

Server should run on `http://localhost:5000`

### 2. **Configure Admin Key**

In `Frontend/src/pages/MySpace.jsx`:

```javascript
const API_KEY = 'your-secret-admin-key'; // Same as ADMIN_KEY in Backend/.env
```

### 3. **Update Backend URL (if needed)**

If backend is on a different URL, update `Frontend/src/services/api.js`:

```javascript
const API_BASE_URL = 'http://your-backend-url:5000/api';
```

## API Endpoints Being Used

| Endpoint | Method | Service | Usage |
|----------|--------|---------|-------|
| `/auth/verify` | POST | authService | Verify access code |
| `/projects` | GET | projectService | Fetch projects |
| `/projects/update` | POST | projectService | Save projects |
| `/upload-image` | POST | projectService | Upload image |
| `/skills` | GET | skillService | Fetch skills |
| `/skills/update` | POST | skillService | Save skills |
| `/contact` | POST | commonService | Submit contact form |
| `/health` | GET | commonService | Health check |

## Error Handling

All services include error handling:

```javascript
try {
  const result = await getProjects();
  if (result.success) {
    // Use result.data
  } else {
    // Handle error: result.message
  }
} catch (error) {
  // Handle network error
  console.error(error.message);
}
```

## Features

### ✨ Automatic Admin Key Injection
- Admin key is automatically added to protected endpoints
- Stored in localStorage from MySpace component
- Retrieved by axios interceptor

### ✨ Fallback to Local Data
- If database is unavailable, MySpace falls back to local data files
- data/projects.js and data/skills.js are used as fallback

### ✨ Image Upload with Cloudinary
- `uploadProjectImage()` handles file upload
- Automatically sends to Cloudinary via backend
- Returns secure_url for storing in database

### ✨ Standardized Responses
All APIs return format:
```javascript
{
  success: true/false,
  message: "Response message",
  data: {...}  // Optional
}
```

## Workflow

### Adding a New Project

1. User enters access code → Backend verifies → AccessCodeGate unlocks
2. Click "Add Project" → ProjectForm modal opens
3. Fill form and submit → `updateProjects()` saves to database
4. Success message shown → Projects list updates

### Submitting Contact Form

1. User fills contact form → Click "Send Message"
2. `submitContactForm()` sends data to backend
3. Backend logs and validates email
4. Response shows success/error

### Fetching Data on Load

1. MySpace component mounts → `fetchData()` called
2. Tries to fetch from database via `getProjects()` and `getSkills()`
3. If fails, falls back to local data files
4. Data displays in admin UI

## Troubleshooting

### "Cannot POST /api/projects/update"
- Backend server not running
- Check: `http://localhost:5000/api/health`

### "Invalid admin key"
- Admin key doesn't match in backend and frontend
- Update `ADMIN_KEY` in Backend/.env
- Update `API_KEY` in Frontend/src/pages/MySpace.jsx

### Images not uploading
- Cloudinary credentials not configured in Backend/.env
- Check CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET

### "Access code invalid"
- Wrong access code entered
- Check `ACCESS_CODE` in Backend/.env (default: "bikash330")

### Falling back to local data
- Backend is down/unreachable
- Check MongoDB connection
- Check server logs for errors

## Development Tips

### Testing Axios Calls

```javascript
// In browser console
// Check axios configuration
import api from './services/api.js'
console.log(api.defaults);

// Test an endpoint
import { getProjects } from './services/projectService.js'
getProjects().then(result => console.log(result))
```

### Debugging Network Requests

1. Open Browser DevTools (F12)
2. Go to Network tab
3. Make API call
4. Check request/response headers and body
5. Look for error status codes (401, 400, 500, etc.)

### Adding New API Service

```javascript
// 1. Create new file: src/services/newService.js
import apiClient from './api';

export const newFunction = async (data) => {
  try {
    const response = await apiClient.post('/endpoint', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Error' };
  }
};
```

## Project Structure

```
Frontend/
├── src/
│   ├── services/
│   │   ├── api.js                 # Axios configuration
│   │   ├── authService.js          # Auth endpoints
│   │   ├── projectService.js       # Project endpoints
│   │   ├── skillService.js         # Skill endpoints
│   │   └── commonService.js        # Common endpoints
│   ├── components/
│   │   ├── AccessCodeGate.jsx     # ✅ Updated
│   │   ├── Contact.jsx             # ✅ Updated
│   │   └── MySpaceAdmin/
│   │       └── ...
│   ├── pages/
│   │   └── MySpace.jsx             # ✅ Updated
│   ├── data/
│   │   ├── projects.js             # Fallback data
│   │   └── skills.js               # Fallback data
│   └── ...
└── ...
```

## Backend Endpoints Reference

### Authentication
```
POST /api/auth/verify
Body: { accessCode: string }
Response: { success: boolean, message: string }
```

### Projects
```
GET /api/projects
Response: { success: boolean, data: [...], count: number }

POST /api/projects/update
Headers: { x-admin-key: string }
Body: { projects: [...] }
Response: { success: boolean, data: { count: number, timestamp: string } }

POST /api/upload-image
Headers: { x-admin-key: string, Content-Type: multipart/form-data }
Body: FormData { image: File, folder: string }
Response: { success: boolean, data: { url: string, publicId: string } }
```

### Skills
```
GET /api/skills
Response: { success: boolean, data: [...], count: number }

POST /api/skills/update
Headers: { x-admin-key: string }
Body: { skills: [...] }
Response: { success: boolean, data: { groups: number, timestamp: string } }
```

### Contact
```
POST /api/contact
Body: { name: string, email: string, message: string }
Response: { success: boolean, message: string, data: {...} }
```

### Health
```
GET /api/health
Response: { success: boolean, message: string, timestamp: string }
```

## Next Steps

1. ✅ Backend and frontend are connected via axios
2. ✅ All services are implemented and integrated
3. ✅ Error handling is in place
4. ✅ Fallback to local data files works

### To Complete:
1. Start both backend and frontend servers
2. Set correct ADMIN_KEY in .env and MySpace.jsx
3. Verify all API calls work via browser network tab
4. Test the full workflow end-to-end

## Support

Check these files for implementation details:
- Backend API Guide: Backend/SETUP.md
- Auth Documentation: Backend/AUTH_GUIDE.md
- Implementation Details: Backend/IMPLEMENTATION.md
