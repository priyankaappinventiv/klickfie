import user from "../../model/userModel";
import addPost from "../../model/addPostModel";
import twilio from "twilio";
import { Request, response, Response } from "express";
import { HydratedDocument } from "mongoose";
import { iUser, post,otpCode } from "../../interface/userInterface";
import  Otp from "../../model/otpModel"
import {otp} from "../../services/otpservice"
import {
  SIGNUP,
  PORT,
  TWILIO,
  HOST,
  VERIFYOTP,
  STATUS_MSG,
  LOGIN,
} from "../../constant/constant";
import { generateToken } from "../../services/jwtServices";


const client: twilio.Twilio = twilio(TWILIO.accountSid, TWILIO.authToken);

const signUp = async (req: Request, res: Response): Promise<void> => {
  const { name, email, phoneNumber, imageUrl } = req.body;
  const userExist: HydratedDocument<iUser> | null = await user.findOne({
    email,
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
    res.status(STATUS_MSG.ERROR.BAD_REQUEST.statusCode).json("error");
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
  const { phoneNumber, code } = req.body;
  const data: HydratedDocument<iUser> | null = await user.findOne({
    phoneNumber,
  });
  const data1: HydratedDocument<otpCode> | null = await Otp.findOne({
    code,
  });
  if (data?.phoneNumber && data1?.code) {
    try {
      if((data.phoneNumber===req.body.phoneNumber)&& (data1.code===req.body.code)){
        console.log(data.phoneNumber,code)
        res
        .status(STATUS_MSG.SUCCESS.OTPVERIFY.statusCode)
        .json({ message: "Verify Sucussfully" });
      }
    } catch (error) {
      res
        .status(STATUS_MSG.ERROR.BAD_REQUEST.statusCode)
        .json({ message: "PhoneNumber or otpcode not found." });
    }
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
    const { phoneNumber } = req.body;
    const userActive: HydratedDocument<iUser> | null = await user.findOne({
      phoneNumber,
      is_active: true,
    });
    if (userActive) {
      const isgetOTP: string = await otp.generateOTP(phoneNumber);
      console.log(isgetOTP);
      const data = await new Otp({
        code: isgetOTP
      })
      const msg: HydratedDocument<otpCode> | null = await data.save();
      const jwtToken = await generateToken(userActive._id);
      res.status(STATUS_MSG.SUCCESS.DEFAULT.statusCode).json({ isgetOTP, jwtToken });
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


const post = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId: string = req.body.id;
    const { title } = req.body;
    const userPost: HydratedDocument<post> | null = new addPost({
      user_id: userId,
      title: title,
      imageUrl: `${HOST.host}:${PORT.baseUrl}/${req.file?.filename}`,
    });
    const data: HydratedDocument<post> | null = await userPost.save();
    res.status(400).json({ message: "Uploaded post" });
  } catch (err: any) {
    console.log(err);
  }
};

export default { signUp, login, verifyOtp, post };
