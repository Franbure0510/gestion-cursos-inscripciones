import { Router } from "express";
import {
  enrollInCourse,
  getMyEnrollments,
  cancelEnrollment,
  getAllEnrollments,
} from "../controllers/enrollment.controller";
import { protect, authorize } from "../middlewares/auth";
import { validate } from "../middlewares/validate";

const router = Router();

router.post("/", protect, authorize("student"), enrollInCourse);
router.get("/my", protect, authorize("student"), getMyEnrollments);
router.put("/:id/cancel", protect, authorize("student"), cancelEnrollment);
router.get("/all", protect, authorize("admin"), getAllEnrollments);

export default router;
