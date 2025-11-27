import { Request, Response } from "express";
import Message from "../models/Message";
import { catchAsync } from "../utils/catchAsync";


export const getOlderMessages = catchAsync(async (req: Request, res: Response) => {
  const beforeId = req.query.before as string;

  const filter = beforeId ? { _id: { $lt: beforeId } } : {};

  const messages = await Message.find(filter)
    .sort({ _id: -1 })
    .limit(30)
    .lean();

  res.json({
    success: true,
    messages: messages.reverse(),
  });
});
