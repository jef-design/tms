import express from "express";
import { loginUser, registerUser } from "../controllers/credentialContollers.js";
import { registerValidator, signInValidator } from "../middleware/validationMiddleware.js";

const router = express.Router();

router.post('/login', signInValidator, loginUser)
router.post('/signup', registerValidator, registerUser)




export default router