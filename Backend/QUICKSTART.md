# Quick Start Guide

## 1. Install Dependencies

```bash
cd Backend
npm install
```

## 2. Get Cloudinary Credentials

- Sign up at https://cloudinary.com (free tier available)
- Go to Dashboard → Settings
- Copy: Cloud Name, API Key, API Secret

## 3. Update .env

Edit `Backend/.env`:

```env
PORT=5000
ACCESS_CODE="bikash330"
MONGO_URI=mongodb://localhost:27017/portfolio
ADMIN_KEY=your-super-secret-key-here

# Cloudinary Config
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

## 4. Start MongoDB

Make sure MongoDB is running on your local machine or use MongoDB Atlas.

For local MongoDB:
```bash
# Windows
mongod

# Mac
brew services start mongodb-community
```

## 5. Start Backend Server

```bash
npm run app
```

Output should look like:
```
Server is running on port 5000
Health check: http://localhost:5000/api/health
```

## 6. Update Frontend

In `Frontend/src/pages/MySpace.jsx`, update:

```javascript
const API_KEY = 'your-super-secret-key-here'; // Same as ADMIN_KEY
```

## 7. Test the API

Visit in browser:
- Health check: http://localhost:5000/api/health
- Get projects: http://localhost:5000/api/projects
- Get skills: http://localhost:5000/api/skills

## 8. Use MySpace Admin

1. Start frontend: `npm run` (or your dev command)
2. Navigate to MySpace admin panel
3. Add/Edit projects and skills
4. Images are automatically uploaded to Cloudinary
5. Data is saved to MongoDB

## 📚 Full Documentation

- Setup details: `SETUP.md`
- Implementation details: `IMPLEMENTATION.md`
- API endpoints: See `SETUP.md` → API Endpoints section

## 🆘 Issues?

- Check MongoDB is running
- Verify Cloudinary credentials in .env
- Ensure admin key matches between backend and frontend
- Check browser console for CORS errors
- Run: `npm install` again if modules missing

## 🎉 Done!

Your portfolio backend is now using:
- ✅ MongoDB for data storage
- ✅ Cloudinary for image hosting
- ✅ Admin authentication
- ✅ Full CRUD APIs
