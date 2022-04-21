import user from "../../model/userModel";
import twilio from "twilio";
import { Request, Response } from "express";
import jwtSign from "../../services/services";
import { HydratedDocument } from "mongoose";
import { JwtPayload } from "jsonwebtoken";
import { iUser } from "../../interface/userInterface";
import { otp } from "../../services/otpservice";
import {
  SIGNUP,
  PORT,
  TWILIO,
  HOST,
  STATUS_MSG,
} from "../../constant/constant";

const client: twilio.Twilio = twilio(TWILIO.accountSid, TWILIO.authToken);

const signUp = async (req: Request, res: Response): Promise<void> => {
  const { name, email, phoneNumber, imageUrl } = req.body;
  const userExist: HydratedDocument<iUser> | null = await user.findOne({
    email,
  });
  try {
    if (userExist) {
      res.status(STATUS_MSG.ERROR.BAD_REQUEST.statusCode).json({ error: SIGNUP.error });
    } else {
      const User: HydratedDocument<iUser> | null = new user({
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        imageUrl: `${HOST.host}:${PORT.baseUrl}/${req.file?.filename}`,
      });
      const data: HydratedDocument<iUser> | null = await User.save();
      res
        .status(STATUS_MSG.SUCCESS.DEFAULT.statusCode)
        .json(STATUS_MSG.SUCCESS.DEFAULT);
    }
  } catch (err) {
    res.status(STATUS_MSG.ERROR.BAD_REQUEST.statusCode).json("error");
  }
};

const verifyOtp = async (req: Request, res: Response): Promise<void> => {
  try{
  const { phoneNumber, code } = req.body;
  const data: HydratedDocument<iUser> | null = await user.findOne({
    phoneNumber,
  });
  if (data) {
    const is_verify = await otp.verifyOTP(phoneNumber, code);
    console.log(is_verify)
    
    //const token: string | JwtPayload = jwtSign(data._id);
    res.status(STATUS_MSG.SUCCESS.DEFAULT.statusCode).json(is_verify);
  }
  } catch(err){
    res.status(STATUS_MSG.ERROR.BAD_REQUEST.statusCode).json(err);
  }  
};

const login = async (req: Request, res: Response): Promise<void> => {
  try{
    const { phoneNumber } = req.body;
    const userActive: HydratedDocument<iUser> | null = await user.findOne({
      phoneNumber,
      is_active: true,
    });
    if (userActive) {
      const isgetOTP: string = await otp.getOTP(phoneNumber);
      console.log(isgetOTP);
      res.status(STATUS_MSG.SUCCESS.DEFAULT.statusCode).json(isgetOTP);
    } 
  }catch(err:any){
    console.log(err); 
    res.status(STATUS_MSG.ERROR.BAD_REQUEST.statusCode).json({err:err.message});
  }
}

const post = async (req: Request, res: Response): Promise<void> => {
  const { title, like, comment, imageUrl } = req.body;

}

export default { signUp, login, verifyOtp };
