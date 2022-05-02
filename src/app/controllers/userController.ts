import user from "../model/userModel";
import addPost from "../model/addPostModel";
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
import { SIGNUP, STATUS_MSG, responses, constant } from "../constant/constant";

const signUp = async (req: Request, res: Response): Promise<void> => {
  const { name, email, phoneNumber, imageUrl }: userData = req.body;
  const userExist: HydratedDocument<iUser> | null = await user.findOne({
    email,
    phoneNumber,
  });
  try {
    if (userExist) {
      responses.status.statusCode = 400;
      responses.status.status = false;
      responses.status.message = constant.message.signUp;
      res.status(constant.statusCode.invalid).json(responses);
    } else {
      const User: HydratedDocument<iUser> | null = new user({
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        imageUrl: imageUrl,
      });
      const data: HydratedDocument<iUser> | null = await User.save();
      const jwtToken = await generateToken(data._id);
      responses.status.message = jwtToken;
      responses.status.statusCode = 200;
      responses.status.status = true;
      res.status(constant.statusCode.success).json(responses);
    }
  } catch (err) {
    responses.status.statusCode = 400;
    responses.status.message = constant.message.signUp;
    responses.status.status = false;
    res.status(constant.statusCode.alreadyLoggedIn).json(responses);
  }
};

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
        responses.status.message = jwtToken;
        responses.status.statusCode = 200;
        responses.status.status = true;
        res.status(constant.statusCode.success).json(responses);
      } else {
        responses.status.statusCode = 400;
        responses.status.message = constant.message.authenticationFailed;
        responses.status.status = false;
        res.status(constant.statusCode.invalid).json(responses);
      }
    } else {
      responses.status.statusCode = 400;
      responses.status.message = constant.message.invalidNumber;
      responses.status.status = false;
      res.status(constant.statusCode.invalid).json(responses);
    }
  } catch (error: any) {
    responses.status.statusCode = 500;
    responses.status.message = constant.message.serverError;
    responses.status.status = false;
    res.status(constant.statusCode.serverError).json(responses);
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { phoneNumber }: userData = req.body;
    const userActive: HydratedDocument<iUser> | null = await user.findOne({
      phoneNumber,
      is_active: true,
    });
    if (userActive) {
      const otpCode: string = await otp.generateOTP(phoneNumber);
      const data = new Otp({
        code: otpCode,
      });
      const msg: HydratedDocument<otpCode> | null = await data.save();
      responses.status.message = otpCode;
      responses.status.statusCode = 200;
      responses.status.status = true;
      res.status(constant.statusCode.success).json(responses);
    } else {
      responses.status.message = constant.message.loginInvalidMsg;
      responses.status.statusCode = 400;
      responses.status.status = false;
      res.status(constant.statusCode.invalid).json(responses);
    }
  } catch (err: any) {
    responses.status.message = constant.message.loginFailed;
    responses.status.statusCode = 401;
    responses.status.status = false;
    res.status(constant.statusCode.loginFailed).json({ responses });
  }
};

const addPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId: string = req.body._id;
    const { title, imageUrl }: userData = req.body;
    const userPost: HydratedDocument<post> | null = new addPost({
      user_id: userId,
      title: title,
      imageUrl: imageUrl,
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

const socialMediaGoogle = async (req: Request,res: Response): Promise<void> => {
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
