import user from "../model/userModel";
import addPost from "../model/addPostModel";
import twilio from "twilio";
import { Request, Response } from "express";
import { HydratedDocument } from "mongoose";
import {
  iUser,
  post,
  otpCode,
  like,
  comment,
  userData,
} from "../interface/userInterface";
import Otp from "../model/otpModel";
import { otp } from "../services/otpService";
import { generateToken } from "../services/jwtServices";
import likePost from "../model/likeModel";
import postComment from "../model/commentModel";
import {
  SIGNUP,
  PORT,
  TWILIO,
  HOST,
  STATUS_MSG,
  LOGIN,
  responses,
} from "../constant/constant";

const client: twilio.Twilio = twilio(TWILIO.accountSid, TWILIO.authToken);

const signUp = async (req: Request, res: Response): Promise<void> => {
  const { name, email, phoneNumber }: userData = req.body;
  const userExist: HydratedDocument<iUser> | null = await user.findOne({
    email,
    phoneNumber,
  });
  try {
    if (userExist) {
      res
        .status(STATUS_MSG.ERROR.BAD_REQUEST.statusCode)
        .json({ error: SIGNUP.error });
    } else {
      const User: HydratedDocument<iUser> | null = new user({
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        imageUrl: `${HOST.host}:${PORT.baseUrl}/${req.file?.filename}`,
      });
      const data: HydratedDocument<iUser> | null = await User.save();
      const jwtToken = await generateToken(data._id);
      res
        .status(STATUS_MSG.SUCCESS.DEFAULT.statusCode)
        .json({ message: SIGNUP.message, jwtToken });
    }
  } catch (err) {
    res
      .status(STATUS_MSG.ERROR.BAD_REQUEST.statusCode)
      .json({ message: "User already Exist." });
  }
};

// const verifyOtp = async (req: Request, res: Response): Promise<void> => {
//   try{
//   const { phoneNumber, code } = req.body;
//   const data: HydratedDocument<iUser> | null = await user.findOne({
//     phoneNumber,
//   });
//   if (data) {
//     const is_verify = await otp.verifyOTP(phoneNumber, code);
//     console.log(is_verify)
//     const token: string | JwtPayload = jwtSign(data._id);
//     res.status(STATUS_MSG.SUCCESS.DEFAULT.statusCode).json(is_verify);
//   }
//   } catch(err){
//     res.status(STATUS_MSG.ERROR.BAD_REQUEST.statusCode).json(err);
//   }
// };

// const verifyOtp = async (req: Request, res: Response): Promise<void> => {
//   const { phoneNumber, code } = req.body;
//   const data: HydratedDocument<iUser> | null = await user.findOne({
//     phoneNumber,
//   });
//   if (data?.phoneNumber && code) {
//     try {
//       client.verify
//         .services(TWILIO.serviceSid)
//         .verificationChecks.create({
//           to: `+${phoneNumber}`,
//           code: code,
//         })
//         .then((data: any) => {
//           if (data.status === VERIFYOTP.status) {
//             res.status(STATUS_MSG.SUCCESS.OTPVERIFY.statusCode).json({
//               msg: VERIFYOTP.msg,
//             });
//           } else {
//             res
//               .status(STATUS_MSG.ERROR.BAD_REQUEST.statusCode)
//               .json({ err: VERIFYOTP.err });
//           }
//         });
//     } catch (error) {
//       res
//         .status(STATUS_MSG.ERROR.BAD_REQUEST.statusCode)
//         .json({ message: VERIFYOTP.message });
//     }
//   } else {
//     res.status(STATUS_MSG.ERROR.BAD_REQUEST.statusCode).json({
//       error: VERIFYOTP.error,
//       phoneNumber: phoneNumber,
//       code: code,
//     });
//   }
// };

const verifyOtp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { phoneNumber, code }: userData = req.body;
    const data: HydratedDocument<iUser> | null = await user.findOne({
      phoneNumber,
    });
    const info: HydratedDocument<otpCode> | null = await Otp.findOne({
      code,
    });
    if (data && info && data?.phoneNumber && info?.code) {
      if (
        data.phoneNumber === req.body.phoneNumber &&
        info.code === req.body.code
      ) {
        const jwtToken = await generateToken(data._id);
        console.log(data.phoneNumber, code);
        res
          .status(STATUS_MSG.SUCCESS.OTPVERIFY.statusCode)
          .json({ message: "Verify Sucussfully", jwtToken });
      } else {
        res
          .status(STATUS_MSG.ERROR.BAD_REQUEST.statusCode)
          .json({ message: "Verification failed." });
      }
    } else {
      res
        .status(STATUS_MSG.ERROR.BAD_REQUEST.statusCode)
        .json({ message: "PhoneNumber or otpcode not matched." });
    }
  } catch (error) {
    res
      .status(STATUS_MSG.ERROR.BAD_REQUEST.statusCode)
      .json({ message: "internal server error" });
  }
};

// const login = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { phoneNumber } = req.body;
//     const userActive: HydratedDocument<iUser> | null = await user.findOne({
//       phoneNumber,
//       is_active: true,
//     });
//     if (userActive) {
//       const isgetOTP: string = await otp.getOTP(phoneNumber);
//       console.log(isgetOTP);
//       res.status(STATUS_MSG.SUCCESS.DEFAULT.statusCode).json(isgetOTP);
//     } else {
//       res
//         .status(STATUS_MSG.ERROR.BAD_REQUEST.statusCode)
//         .json({ msg: LOGIN.data });
//     }
//   } catch (err: any) {
//     console.log(err);
//     res
//       .status(STATUS_MSG.ERROR.BAD_REQUEST.statusCode)
//       .json({ err: err.message });
//   }
// };

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { phoneNumber }: userData = req.body;
    const userActive: HydratedDocument<iUser> | null = await user.findOne({
      phoneNumber,
      is_active: true,
    });
    if (userActive) {
      const otpCode: String = await otp.generateOTP(phoneNumber);
      console.log(otpCode);
      const data = new Otp({
        code: otpCode,
      });
      const msg: HydratedDocument<otpCode> | null = await data.save();
      res.status(STATUS_MSG.SUCCESS.DEFAULT.statusCode).json({ otpCode });
    } else {
      res
        .status(STATUS_MSG.ERROR.BAD_REQUEST.statusCode)
        .json({ msg: LOGIN.data });
    }
  } catch (err: any) {
    console.log(err);
    res
      .status(STATUS_MSG.ERROR.BAD_REQUEST.statusCode)
      .json({ err: err.message });
  }
};

const addPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId: string = req.body._id;
    const { title }: userData = req.body;
    const userPost: HydratedDocument<post> | null = new addPost({
      user_id: userId,
      title: title,
      imageUrl: `${HOST.host}:${PORT.baseUrl}/${req.file?.filename}`,
    });
    const data: HydratedDocument<post> | null = await userPost.save();
    res.status(200).json({ message: " Post uploaded " });
  } catch (err: any) {
    console.log(err);
  }
};

const getPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId: string = req.body._id;
    const detail = await addPost.findOne({ _id: userId });
    res.json(detail);
  } catch (err) {
    res.json({ message: "error" });
  }
};

const postLikes = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId: string = req.body._id;
    const postId: HydratedDocument<post> | null = await addPost.findOne({
      userId,
    });
    // console.log(postId)
    const info: HydratedDocument<like> | null = new likePost({
      user_id: userId,
      post_id: postId?._id,
      likePost: req.body.likePost,
    });
    const data: HydratedDocument<like> | null = await info.save();
    res.status(200).json({ message: "Post liked." });
  } catch (err: any) {
    console.log(err);
  }
};

const commentPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId: string = req.body._id;
    const postId: HydratedDocument<post> | null = await addPost.findOne({
      userId,
    });
    // console.log(postId)
    const data: HydratedDocument<comment> | null = new postComment({
      user_id: userId,
      post_id: postId?._id,
      body: req.body.body,
    });
    const info: HydratedDocument<comment> | null = await data.save();
    res.status(200).json({ message: "Post Commented." });
  } catch (err: any) {
    console.log(err);
  }
};

const socialMediaFb = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email }: userData = req.body;
    const userExist: HydratedDocument<iUser> | null = await user.findOne({
      email,
      name,
    });
    if (userExist) {
      res
        .status(STATUS_MSG.ERROR.BAD_REQUEST.statusCode)
        .json({ error: SIGNUP.error });
    } else {
      const User: HydratedDocument<iUser> | null = new user({
        name: name,
        email: email,
      });
      const data: HydratedDocument<iUser> | null = await User.save();
      res.status(200).json({ message: "Signup successfully" });
    }
  } catch (err) {
    res.json(err);
  }
};

const socialMediaGoogle = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email }: userData = req.body;
    const userExist: HydratedDocument<iUser> | null = await user.findOne({
      email,
      name,
    });
    if (userExist) {
      res
        .status(STATUS_MSG.ERROR.BAD_REQUEST.statusCode)
        .json({ error: SIGNUP.error });
    } else {
      const User: HydratedDocument<iUser> | null = new user({
        name: name,
        email: email,
      });
      const data: HydratedDocument<iUser> | null = await User.save();
      res.status(200).json({ message: "Signup successfully" });
    }
  } catch (err) {
    res.json(err);
  }
};

export default {
  signUp,
  login,
  verifyOtp,
  addPosts,
  getPost,
  postLikes,
  commentPost,
  socialMediaFb,
  socialMediaGoogle,
};
