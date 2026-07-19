import { Response, NextFunction } from "express";
import Enrollment from "../models/Enrollment";
import Course from "../models/Course";
import { AuthRequest } from "../middlewares/auth";
import { AppError } from "../middlewares/errorHandler";

export const enrollInCourse = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { courseId } = req.body;
    const studentId = req.user!._id;

    const course = await Course.findById(courseId);
    if (!course) {
      throw new AppError("Curso no encontrado", 404);
    }

    if (!course.isActive) {
      throw new AppError("El curso no está disponible", 400);
    }

    const existingEnrollment = await Enrollment.findOne({
      student: studentId,
      course: courseId,
      status: { $ne: "cancelled" },
    });
    if (existingEnrollment) {
      throw new AppError("Ya estás inscrito en este curso", 400);
    }

    if (course.currentStudents >= course.maxStudents) {
      throw new AppError("El curso está lleno", 400);
    }

    const enrollment = await Enrollment.create({
      student: studentId,
      course: courseId,
    });

    await Course.findByIdAndUpdate(courseId, {
      $inc: { currentStudents: 1 },
    });

    const populated = await enrollment.populate("course");

    res.status(201).json({ success: true, enrollment: populated });
  } catch (error) {
    next(error);
  }
};

export const getMyEnrollments = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const enrollments = await Enrollment.find({ student: req.user!._id })
      .populate("course")
      .sort({ enrolledAt: -1 });

    res.json({ success: true, enrollments });
  } catch (error) {
    next(error);
  }
};

export const cancelEnrollment = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const enrollment = await Enrollment.findOne({
      _id: req.params.id,
      student: req.user!._id,
    });

    if (!enrollment) {
      throw new AppError("Inscripción no encontrada", 404);
    }

    if (enrollment.status === "cancelled") {
      throw new AppError("La inscripción ya está cancelada", 400);
    }

    enrollment.status = "cancelled";
    await enrollment.save();

    await Course.findByIdAndUpdate(enrollment.course, {
      $inc: { currentStudents: -1 },
    });

    res.json({ success: true, message: "Inscripción cancelada", enrollment });
  } catch (error) {
    next(error);
  }
};

export const getAllEnrollments = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const enrollments = await Enrollment.find()
      .populate("student", "name email")
      .populate("course", "title category")
      .sort({ enrolledAt: -1 });

    res.json({ success: true, enrollments });
  } catch (error) {
    next(error);
  }
};
