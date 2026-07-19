import { Router } from "express";
import {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getCategories,
} from "../controllers/course.controller";
import { protect, authorize } from "../middlewares/auth";
import { courseValidation, idParamValidation, paginationValidation } from "../validations";
import { validate } from "../middlewares/validate";

const router = Router();

router.get("/", paginationValidation, validate, getCourses);
router.get("/categories", getCategories);
router.get("/:id", idParamValidation, validate, getCourseById);

router.post("/", protect, authorize("admin"), courseValidation, validate, createCourse);
router.put("/:id", protect, authorize("admin"), idParamValidation, courseValidation, validate, updateCourse);
router.delete("/:id", protect, authorize("admin"), idParamValidation, validate, deleteCourse);

export default router;
