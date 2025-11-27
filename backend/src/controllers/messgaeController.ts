import { Request, Response } from "express";
import Message from "../models/Message";

export const getOlderMessages = async (req: Request, res: Response) => {
  try {
    const beforeId = req.query.before as string;

    const filter = beforeId
      ? { _id: { $lt: beforeId } }
      : {};

    const messages = await Message.find(filter)
      .sort({ _id: -1 }) 
      .limit(30)
      .lean(); 

    return res.json({
      success: true,
      messages: messages.reverse()
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
