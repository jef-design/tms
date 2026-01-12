import express from "express";
import { loginUser } from "../controllers/credentialContollers.js";
import { registerValidator, signInValidator } from "../middleware/validationMiddleware.js";
const router = express.Router();
router.post('/login', signInValidator, loginUser);
router.post('/registerValidator', registerValidator);
export default router;
