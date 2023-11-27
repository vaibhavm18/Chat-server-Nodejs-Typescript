import { Schema, model } from "mongoose";
import { IPersonalChat } from "../types/chat.type.js";

const personalChatSchema = new Schema<IPersonalChat>({
  sender: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },

  receiver: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },

  createAt: {
    type: Date,
    default: Date.now(),
  },
});

export const PersonalChats = model<IPersonalChat>(
  "PersonalChats",
  personalChatSchema,
);
