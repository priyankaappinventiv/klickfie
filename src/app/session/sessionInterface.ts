import { Types } from "mongoose";

export interface iSession {
  deviceToken: string;
  isActive: boolean;
  isLoggedIn: boolean;
  userId: Types.ObjectId;
  deviceId: string;
}
export namespace interfaceSession {
  export interface CreateData {
    deviceId: string;
    deviceToken: string;
  }
  export interface tokenDetails {
    userId?: Types.ObjectId;
    sessionId: Types.ObjectId;
    deviceToken: string;
  }
}
