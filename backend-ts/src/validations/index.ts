import { body, param, query } from "express-validator";

export const registerValidation = [
  body("name")
    .trim()
    .notEmpty().withMessage("El nombre es obligatorio")
    .isLength({ max: 100 }).withMessage("Máximo 100 caracteres"),
  body("email")
    .trim()
    .notEmpty().withMessage("El email es obligatorio")
    .isEmail().withMessage("Email inválido")
    .normalizeEmail(),
  body("password")
    .notEmpty().withMessage("La contraseña es obligatoria")
    .isLength({ min: 6 }).withMessage("Mínimo 6 caracteres"),
  body("role")
    .optional()
    .isIn(["admin", "student"]).withMessage("Rol inválido"),
];

export const loginValidation = [
  body("email")
    .trim()
    .notEmpty().withMessage("El email es obligatorio")
    .isEmail().withMessage("Email inválido")
    .normalizeEmail(),
  body("password")
    .notEmpty().withMessage("La contraseña es obligatoria"),
];

export const courseValidation = [
  body("title")
    .trim()
    .notEmpty().withMessage("El título es obligatorio")
    .isLength({ max: 200 }).withMessage("Máximo 200 caracteres"),
  body("description")
    .trim()
    .notEmpty().withMessage("La descripción es obligatoria")
    .isLength({ max: 2000 }).withMessage("Máximo 2000 caracteres"),
  body("instructor")
    .trim()
    .notEmpty().withMessage("El instructor es obligatorio"),
  body("category")
    .trim()
    .notEmpty().withMessage("La categoría es obligatoria"),
  body("level")
    .optional()
    .isIn(["beginner", "intermediate", "advanced"]).withMessage("Nivel inválido"),
  body("duration")
    .trim()
    .notEmpty().withMessage("La duración es obligatoria"),
  body("price")
    .notEmpty().withMessage("El precio es obligatorio")
    .isFloat({ min: 0 }).withMessage("El precio debe ser positivo"),
  body("maxStudents")
    .notEmpty().withMessage("El cupo máximo es obligatorio")
    .isInt({ min: 1 }).withMessage("Mínimo 1 cupo"),
  body("syllabus")
    .optional()
    .isArray().withMessage("El temario debe ser un arreglo"),
];

export const idParamValidation = [
  param("id").isMongoId().withMessage("ID inválido"),
];

export const paginationValidation = [
  query("page").optional().isInt({ min: 1 }).withMessage("Página inválida"),
  query("limit").optional().isInt({ min: 1, max: 50 }).withMessage("Límite inválido"),
  query("search").optional().isString(),
  query("category").optional().isString(),
  query("level").optional().isIn(["beginner", "intermediate", "advanced"]),
];
