import { Request, Response, NextFunction } from "express";
import Message from "../models/Message";
import { CustomError } from "../utils/customError";

export const getOlderMessages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const beforeId = req.query.before as string;

    const filter = beforeId ? { _id: { $lt: beforeId } } : {};

    const messages = await Message.find(filter)
      .sort({ _id: -1 })
      .limit(30)
      .lean();

    res.json({
      success: true,
      messages: messages.reverse()
    });
  } catch (error) {
    next(error);
  }
};
