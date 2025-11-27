import { Request, Response } from "express";
import User from "../models/User";
import { generateToken } from "../utils/jwt";
import { AuthRequest } from "../types";
import { CustomError } from "../utils/customError";
import { catchAsync } from "../utils/catchAsync";

// REGISTER
export const register = catchAsync(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ $or: [{ email }, { username }] });
  if (userExists) {
    throw new CustomError("User already exists", 400);
  }

  const user = await User.create({ username, email, password });

  res.status(201).json({
    success: true,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    message: "User created successfully",
  });
});

// LOGIN
export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError("Please provide email and password", 400);
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password))) {
    throw new CustomError("Invalid credentials", 401);
  }

  const token = generateToken(user._id.toString());

  res.status(200).json({
    success: true,
    token,
    user: {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
    },
    message: "Login successful",
  });
});

// GET ME
export const getMe = catchAsync(async (req: AuthRequest, res: Response) => {
  const user = await User.findById(req.user?.id).select("-password");

  if (!user) {
    throw new CustomError("User not found", 404);
  }

  res.status(200).json({
    success: true,
    user,
    message: "User fetched successfully",
  });
});


