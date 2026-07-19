import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import { AppError } from "../middlewares/errorHandler";
import { sendTokenResponse } from "../utils/jwt";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError("El email ya está registrado", 400);
    }

    const user = await User.create({ name, email, password, role });

    sendTokenResponse(res, user, 201, "Registro exitoso");
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new AppError("Credenciales inválidas", 401);
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new AppError("Credenciales inválidas", 401);
    }

    sendTokenResponse(res, user, 200, "Inicio de sesión exitoso");
  } catch (error) {
    next(error);
  }
};

export const getMe = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await User.findById(req.user._id);
    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    res.cookie("token", "none", {
      expires: new Date(Date.now() + 5 * 1000),
      httpOnly: true,
    });
    res.json({ success: true, message: "Sesión cerrada" });
  } catch (error) {
    next(error);
  }
};
