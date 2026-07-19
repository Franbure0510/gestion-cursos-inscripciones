import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const validate = (req: Request, _res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array().map((e) => e.msg);
    _res.status(400).json({
      success: false,
      message: messages.join(", "),
      errors: errors.array(),
    });
    return;
  }
  next();
};
