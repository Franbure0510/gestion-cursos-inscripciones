import { Router } from "express";
import { register, login, getMe, logout } from "../controllers/auth.controller";
import { protect } from "../middlewares/auth";
import { registerValidation, loginValidation } from "../validations";
import { validate } from "../middlewares/validate";

const router = Router();

router.post("/register", registerValidation, validate, register);
router.post("/login", loginValidation, validate, login);
router.get("/me", protect, getMe);
router.post("/logout", protect, logout);

export default router;
