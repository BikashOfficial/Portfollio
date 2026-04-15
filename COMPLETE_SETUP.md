# Complete Setup & Run Guide

## Prerequisites

- Node.js installed
- MongoDB running (locally or MongoDB Atlas)
- Cloudinary account (for image hosting)

## Backend Setup

### 1. Install Dependencies
```bash
cd Backend
npm install
```

### 2. Configure Environment Variables
Edit `Backend/.env`:

```env
PORT=5000
ACCESS_CODE="bikash330"
MONGO_URI=mongodb://localhost:27017/portfolio
ADMIN_KEY=your-secret-admin-key

# Cloudinary Config
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Replace:
- `your_cloud_name`, `your_api_key`, `your_api_secret` with Cloudinary credentials
- `your-secret-admin-key` with a strong secret password

### 3. Start Backend Server
```bash
npm run app
```

Output should show:
```
Server is running on port 5000
Health check: http://localhost:5000/api/health
```

Verify in browser: http://localhost:5000/api/health

## Frontend Setup

### 1. Verify Dependencies
```bash
cd Frontend
npm install
```

(axios should already be in package.json)

### 2. Configure API Key
Edit `Frontend/src/pages/MySpace.jsx`:

```javascript
const API_KEY = 'your-secret-admin-key'; // Must match Backend ADMIN_KEY
```

### 3. Start Frontend Dev Server
```bash
npm run dev
```

Output will show:
```
  VITE v... ready in ... ms

  ➜  Local:   http://localhost:5173/
```

## Testing the Connection

### 1. Health Check
```bash
curl http://localhost:5000/api/health
```

Should return:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2026-04-15T10:30:00.000Z"
}
```

### 2. Access Code Verification
```bash
curl -X POST http://localhost:5000/api/auth/verify \
  -H "Content-Type: application/json" \
  -d '{"accessCode":"bikash330"}'
```

Should return:
```json
{
  "success": true,
  "message": "Access verified successfully"
}
```

### 3. Get Projects
```bash
curl http://localhost:5000/api/projects
```

Should return projects array or empty array.

## Complete Workflow

### 1. Visit MySpace Admin
1. Open: http://localhost:5173 (or your frontend URL)
2. Navigate to MySpace (/myspace route)
3. Enter access code: `bikash330`
4. Click "Unlock Access"

### 2. Manage Projects
1. Click "📁 Projects" tab (if not already selected)
2. Click "+ Add Project" button
3. Fill in project form:
   - Title: "My Project"
   - Description: "Project details"
   - Technologies: Click "Add" to add tech tags
   - Image URL: Paste image URL or upload
   - Demo/GitHub links (optional)
4. Click "Save Project"
5. Success message appears
6. Project saved to MongoDB

### 3. Manage Skills
1. Click "🎯 Skills" tab
2. Select skill group from dropdown
3. Click "+ Add Skill" button
4. Enter skill name and emoji
5. Click "Save Skill"
6. Skill added to database

### 4. Contact Form
1. Go to home page
2. Scroll to "Contact" section
3. Fill form:
   - Name
   - Email
   - Message
4. Click "Send Message"
5. Backend logs the message
6. Success notification appears

## File Structure

```
Portfolio/
├── Backend/
│   ├── config/
│   │   ├── db.js              # MongoDB connection
│   │   └── cloudinary.js      # Cloudinary config
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── contactController.js
│   │   └── mySpaceController.js
│   ├── middleware/
│   │   └── upload.js          # File upload config
│   ├── modules/
│   │   ├── projects.js        # Project schema
│   │   └── skills.js          # Skills schema
│   ├── routes/
│   │   ├── auth.js
│   │   ├── contact.js
│   │   └── mySpace.js
│   ├── app.js                 # Express app
│   ├── .env                   # Environment variables
│   ├── package.json
│   ├── SETUP.md               # Backend setup guide
│   ├── AUTH_GUIDE.md          # Auth documentation
│   └── IMPLEMENTATION.md      # Technical details
│
└── Frontend/
    ├── src/
    │   ├── services/
    │   │   ├── api.js         # Axios config
    │   │   ├── authService.js
    │   │   ├── projectService.js
    │   │   ├── skillService.js
    │   │   └── commonService.js
    │   ├── components/
    │   │   ├── AccessCodeGate.jsx  # Access control
    │   │   ├── Contact.jsx         # Contact form
    │   │   └── MySpaceAdmin/
    │   │       ├── ProjectForm.jsx
    │   │       ├── ProjectList.jsx
    │   │       ├── SkillForm.jsx
    │   │       └── SkillsList.jsx
    │   ├── pages/
    │   │   └── MySpace.jsx         # Admin dashboard
    │   ├── data/
    │   │   ├── projects.js         # Fallback data
    │   │   └── skills.js           # Fallback data
    │   └── ...
    ├── package.json
    └── AXIOS_INTEGRATION.md        # Integration guide
```

## Troubleshooting

### Backend Issues

**"Port 5000 already in use"**
```bash
# Kill process on port 5000
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:5000 | xargs kill -9
```

**"MongoDB connection failed"**
- Ensure MongoDB is running:
  ```bash
  # Local MongoDB
  mongod
  
  # Or use MongoDB Atlas connection string
  ```

**"Cannot find module 'cloudinary'"**
```bash
npm install cloudinary
```

### Frontend Issues

**"Cannot find module from services"**
- Ensure file paths are correct
- Check services folder exists at `src/services/`
- Restart dev server: `npm run dev`

**"Access denied to /api/projects/update"**
- Check `ADMIN_KEY` matches between .env and MySpace.jsx
- Verify admin key is being sent correctly
- Check browser Network tab for request headers

**"Axios not found"**
```bash
npm install axios
```

### Connection Issues

**"Cannot reach localhost:5000"**
1. Is backend running? Check terminal output
2. Try: http://localhost:5000/api/health in browser
3. If no response, backend is not running

**"Fallback to local data"**
- This is normal if backend is unavailable
- Check backend console for errors
- Ensure MongoDB connection is working

## Database Management

### View Data in MongoDB

```bash
# Connect to local MongoDB
mongo

# Select database
use portfolio

# View collections
show collections

# Check projects
db.projects.find()

# Check skills
db.skillgroups.find()
```

### Clear Data

```bash
# Delete all projects
db.projects.deleteMany({})

# Delete all skills
db.skillgroups.deleteMany({})
```

## Performance Tips

1. **Images**: Use Cloudinary URLs for fast delivery
2. **Lazy Loading**: Projects/skills load on demand
3. **Caching**: Consider adding caching headers
4. **Compression**: Use gzip for API responses

## Production Deployment

### Backend (Render, Railway, Heroku)
1. Push code to GitHub
2. Connect repository
3. Set environment variables
4. Deploy

### Frontend (Vercel, Netlify)
1. Update API_BASE_URL in services/api.js
2. Build: `npm run build`
3. Deploy dist folder

## Security Checklist

- [ ] ADMIN_KEY is strong (not default)
- [ ] MongoDB username/password set
- [ ] Cloudinary credentials stored in .env
- [ ] .env file not committed to git
- [ ] ACCESS_CODE changed from default
- [ ] HTTPS used in production
- [ ] CORS configured for production domain

## Next Steps

1. ✅ Backend running on localhost:5000
2. ✅ Frontend running on localhost:5173
3. ✅ MongoDB connected
4. ✅ Cloudinary configured
5. Test full workflow end-to-end
6. Deploy to production
7. Monitor logs and errors

## Support Resources

- Backend API: Backend/SETUP.md
- Authentication: Backend/AUTH_GUIDE.md
- Axios Integration: Frontend/AXIOS_INTEGRATION.md
- Technical Details: Backend/IMPLEMENTATION.md

## Quick Commands

```bash
# Backend
cd Backend && npm run app

# Frontend
cd Frontend && npm run dev

# Build for production
cd Frontend && npm run build

# Preview production build
cd Frontend && npm run preview
```

## Getting Help

1. Check error messages in console
2. Look at network tab in browser DevTools
3. Check server logs in terminal
4. Review documentation files
5. Verify environment variables are set
