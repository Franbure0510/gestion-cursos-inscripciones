import { Request, Response, NextFunction } from "express";
import Course from "../models/Course";
import { AppError } from "../middlewares/errorHandler";

export const getCourses = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const filter: any = { isActive: true };

    if (req.query.category) {
      filter.category = req.query.category;
    }
    if (req.query.level) {
      filter.level = req.query.level;
    }
    if (req.query.search) {
      filter.$text = { $search: req.query.search as string };
    }

    const total = await Course.countDocuments(filter);
    const courses = await Course.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      courses,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getCourseById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      throw new AppError("Curso no encontrado", 404);
    }
    res.json({ success: true, course });
  } catch (error) {
    next(error);
  }
};

export const createCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({ success: true, course });
  } catch (error) {
    next(error);
  }
};

export const updateCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!course) {
      throw new AppError("Curso no encontrado", 404);
    }
    res.json({ success: true, course });
  } catch (error) {
    next(error);
  }
};

export const deleteCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      throw new AppError("Curso no encontrado", 404);
    }
    res.json({ success: true, message: "Curso eliminado" });
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const categories = await Course.distinct("category", { isActive: true });
    res.json({ success: true, categories });
  } catch (error) {
    next(error);
  }
};
