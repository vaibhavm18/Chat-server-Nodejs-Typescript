import { Response } from "express";
import { ACCESS_TOKEN_EXP } from "../config/env.js";
import { IUser } from "../types/user.type.js";

export async function cookieToken(
  user: IUser,
  res: Response,
  time?: string,
): Promise<string> {
  const token = await user.getAccessToken();

  if (!time) {
    time = ACCESS_TOKEN_EXP;
  }

  const option = {
    expires: new Date(Date.now() + parseInt(time) * 24 * 60 * 1000),
    httpOnly: true,
    secure: true,
  };

  res.cookie("access_token", token, {
    ...option,
  });

  return token;
}
