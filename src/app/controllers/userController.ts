import user from "../model/userModel";
import { Request, Response } from "express";
import { HydratedDocument } from "mongoose";
import { iUser, userData } from "../interface/userInterface";
import { otpCode } from "../interface/otpInterface";
import Otp from "../model/otpModel";
import { otp } from "../services/otpService";
import { generateToken } from "../services/jwtServices";
import { constant } from "../constant/constant";
import { responses } from "../helper/response";

const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phoneNumber, imageUrl }: userData = req.body;
    const userExist: HydratedDocument<iUser> | null = await user.findOne({
      email,
      phoneNumber,
    });
    if (userExist) {
      responses.status.statusCode = 400;
      responses.status.status = false;
      responses.status.message = constant.message.signUp;
      res.status(constant.statusCode.invalid).json(responses.status);
    } else {
      const User: HydratedDocument<iUser> | null = new user({
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        imageUrl: imageUrl,
      });
      const data: HydratedDocument<iUser> | null = await User.save();
      const otpCode: string = await otp.generateOTP(phoneNumber);
      const dataCode = new Otp({
        code: otpCode,
      });
      const msg: HydratedDocument<otpCode> | null = await dataCode.save();
      const code = otpCode;
      responses.status.message = constant.message.signUpMsg;
      responses.status.statusCode = 200;
      responses.status.status = true;
      res
        .status(constant.statusCode.success)
        .json({...responses.status,OTP:code});
    }
  } catch (err) {
    responses.status.statusCode = 406;
    responses.status.message = constant.message.signUpFail;
    responses.status.status = false;
    res.status(constant.statusCode.alreadyLoggedIn).json( responses.status);
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
      const code = otpCode;
      responses.status.statusCode = 200;
      responses.status.status = true;
      responses.status.message = constant.message.otpMsg;
      res
        .status(constant.statusCode.success)
        .json({...responses.status, code: otpCode} );
    } else {
      responses.status.message = constant.message.loginInvalidMsg;
      responses.status.statusCode = 400;
      responses.status.status = false;
      res.status(constant.statusCode.invalid).json(responses.status);
    }
  } catch (err: any) {
    responses.status.message = constant.message.loginFailed;
    responses.status.statusCode = 401;
    responses.status.status = false;
    res.status(constant.statusCode.loginFailed).json(responses.status);
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
        responses.status.message = constant.message.verifyMsg;
        res
          .status(constant.statusCode.success)
          .json({...responses.status, data: jwtToken });
      } else {
        responses.status.statusCode = 400;
        responses.status.message = constant.message.authenticationFailed;
        responses.status.status = false;
        res.status(constant.statusCode.invalid).json(responses.status);
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

const socialMediaFb = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email }: userData = req.body;
    const userExist: HydratedDocument<iUser> | null = await user.findOne({
      email,
    });
    if (userExist) {
      responses.status.statusCode = 200;
      responses.status.status = true;
      responses.status.message = constant.message.signUp;
      res.status(constant.statusCode.success).json(responses.status);
    } else {
      const User: HydratedDocument<iUser> | null = new user({
        name: name,
        email: email,
      });
      const data: HydratedDocument<iUser> | null = await User.save();
      responses.status.message = constant.message.signUpMsg;
      responses.status.statusCode = 200;
      responses.status.status = true;
      res
        .status(constant.statusCode.success)
        .json(responses.status);
    }
  } catch (err: any) {
    console.log(err);
    responses.status.message = constant.message.serverError;
    responses.status.statusCode = 500;
    responses.status.status = false;
    res.status(constant.statusCode.serverError).json(responses.status);
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
    });
    if (userExist) {
      responses.status.statusCode = 200;
      responses.status.status = true;
      responses.status.message = constant.message.signUp;
      res.status(constant.statusCode.success).json( responses.status);
    } else {
      const User: HydratedDocument<iUser> | null = new user({
        name: name,
        email: email,
      });
      const data: HydratedDocument<iUser> | null = await User.save();
      responses.status.message = constant.message.signUpMsg;
      responses.status.statusCode = 200;
      responses.status.status = true;
      res
        .status(constant.statusCode.success)
        .json(responses.status);
    }
  } catch (err: any) {
    responses.status.message = constant.message.serverError;
    responses.status.statusCode = 500;
    responses.status.status = false;
    res.status(constant.statusCode.serverError).json(responses.status);
  }
};

export default {
  signUp,
  login,
  verifyOtp,
  socialMediaFb,
  socialMediaGoogle,
};
