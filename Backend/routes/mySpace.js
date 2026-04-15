import express from "express";
import { verifyAdminKey, uploadImage, updateProjects, updateSkills, getProjects, getSkills } from "../controllers/mySpaceController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Public routes - Get data
router.get("/projects", getProjects);
router.get("/skills", getSkills);

// Protected routes - Update data (requires admin key)
router.post("/upload-image", verifyAdminKey, upload.single('image'), uploadImage);
router.post("/projects/update", verifyAdminKey, updateProjects);
router.post("/skills/update", verifyAdminKey, updateSkills);

export default router;
