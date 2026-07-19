import jwt from "jsonwebtoken";
import { Response } from "express";
import { IUser } from "../models/User";

const generateToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "secret", {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  } as jwt.SignOptions);
};

export const sendTokenResponse = (
  res: Response,
  user: IUser,
  statusCode: number,
  message: string
): void => {
  const token = generateToken(user._id.toString());

  const cookieExpire = parseInt(process.env.JWT_COOKIE_EXPIRE || "7", 10);

  const cookieOptions = {
    expires: new Date(Date.now() + cookieExpire * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none" as const,
  };

  const userResponse = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
    createdAt: user.createdAt,
  };

  res
    .status(statusCode)
    .cookie("token", token, cookieOptions)
    .json({
      success: true,
      message,
      token,
      user: userResponse,
    });
};
