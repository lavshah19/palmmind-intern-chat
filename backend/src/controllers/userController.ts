import { Response } from "express";
import User from "../models/User";
import { AuthRequest } from "../types";
import { CustomError } from "../utils/customError";
import { catchAsync } from "../utils/catchAsync";
//for now base on task requirement it not ask but i make this controllers if in future it can be used to get users by id and so more like showing userd profile etc 

// GET ALL USERS
export const getAllUsers = catchAsync(async (req: AuthRequest, res: Response) => {
  const users = await User.find().select("-password");

  res.status(200).json({
    success: true,
    count: users.length,
    users,
  });
});

// GET USER BY ID
export const getUser = catchAsync(async (req: AuthRequest, res: Response) => {
  const user = await User.findById(req.params.id).select("-password");

  if (!user) {
    throw new CustomError("User not found", 404);
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// UPDATE USER
export const updateUser = catchAsync(async (req: AuthRequest, res: Response) => {
  const { username, email } = req.body;

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { username, email },
    { new: true, runValidators: true }
  ).select("-password");

  if (!user) {
    throw new CustomError("User not found", 404);
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// DELETE USER
export const deleteUser = catchAsync(async (req: AuthRequest, res: Response) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    throw new CustomError("User not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});
