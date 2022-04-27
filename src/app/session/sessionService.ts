// import { Types } from "mongoose";
// import { HydratedDocument } from "mongoose";
// import { SessionModel } from "./sessionModel";
// import { interfaceSession, iSession } from "./sessionInterface";
// import { tokenUtil } from "../utils/index";
// import { redis } from "../database/index";
// class sessionServiceClass {
//   async create(
//     userId: Types.ObjectId,
//     data: interfaceSession.CreateData
//   ): Promise<string> {
//     const session: HydratedDocument<iSession> = await SessionModel.create({
//       userId,
//       ...data,
//     });
//     redis.createSession(userId, {
//       sessionId: session._id,
//       deviceToken: data.deviceToken,
//     });
//     return tokenUtil.generateToken({
//       userId,
//       sessionId: session._id,
//       deviceToken: data.deviceToken,
//     });
//   }
//   async loginCreate(
//     userId: Types.ObjectId,
//     data: interfaceSession.CreateData
//   ): Promise<string> {
//     try {
//       const oldSession = await SessionModel.findOne({ userId }).sort({
//         createdAt: -1,
//       });
//       if (oldSession) {
//         await SessionModel.updateMany(
//           { _id: oldSession._id },
//           { $set: { isLoggedIn: false } }
//         );
//       }
//       const session: HydratedDocument<iSession> = await SessionModel.create({
//         userId,
//         ...data,
//       });
//       redis.createSession(userId, {
//         sessionId: session._id,
//         deviceToken: data.deviceToken,
//       });
//       return tokenUtil.generateToken({
//         userId,
//         sessionId: session._id,
//         deviceToken: data.deviceToken,
//       });
//     } catch (err: any) {
//       console.error(err.message);
//       return Promise.reject(err);
//     }
//   }
// }
// export const sessionService = new sessionServiceClass();
