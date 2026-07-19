import { Router } from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getStats,
} from "../controllers/user.controller";
import { protect, authorize } from "../middlewares/auth";
import { idParamValidation } from "../validations";
import { validate } from "../middlewares/validate";

const router = Router();

router.use(protect, authorize("admin"));

router.get("/", getUsers);
router.get("/stats", getStats);
router.get("/:id", idParamValidation, validate, getUserById);
router.put("/:id", idParamValidation, validate, updateUser);
router.delete("/:id", idParamValidation, validate, deleteUser);

export default router;
