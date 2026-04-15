import express from "express";
import { handleContactForm } from "../controllers/contactController.js";

const router = express.Router();

// POST /api/contact - Handle contact form submissions
router.post("/", handleContactForm);

export default router;
