import user from "../../model/userModel";
import twilio from "twilio";
import { Request, Response } from "express";
import jwtSign from "../../services/services";
import {
  LOGIN,
  SIGNUP,
  VERIFYOTP,
  PORT,
  TWILIO,
} from "../../constant/constant";

const client = twilio(TWILIO.accountSid, TWILIO.authToken);

const signUp = async (req: Request, res: Response): Promise<void> => {
  const { name, email, phoneNumber, imageUrl } = req.body;
  const userExist = await user.findOne({ email });
  if (userExist) {
    res.status(400).json({ error: SIGNUP.error });
  } else {
    const User = new user({
      name: name,
      email: email.toLowerCase(),
      phoneNumber: phoneNumber,
      imageUrl: `http://localhost:${PORT.baseUrl}/${req.file?.filename}`,
    });
    try {
      const data = await User.save();
      if (!data) {
        res.status(404).json({ message: SIGNUP.message });
      } else {
        res.status(200).json({ data });
      }
    } catch (err) {
      res.status(400).json({ err: SIGNUP.err });
    }
  }
};

const verifyOtp = async (req: Request, res: Response): Promise<void> => {
  const { phoneNumber, code } = req.body;
  if (phoneNumber && code.length == 4) {
    client.verify
      .services(TWILIO.serviceSid)
      .verificationChecks.create({
        to: `+${phoneNumber}`,
        code: code,
      })
      .then((data: any) => {
        if (data.status === "approved") {
          res.status(200).json({
            message: VERIFYOTP.message,
            data,
          });
        }
      });
  } else {
    res.status(400).json({
      error: VERIFYOTP.error,
      phoneNumber: phoneNumber,
      code: code,
    });
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  const { phoneNumber } = req.body;
  const userActive = await user.findOne({ phoneNumber, is_active: true });
  if (userActive) {
    try {
      let data = await user.findOne({ phoneNumber });
      if (data && phoneNumber == data.phoneNumber) {
        client.verify
          .services(TWILIO.serviceSid)
          .verifications.create({
            to: `+${phoneNumber}`,
            channel: "sms",
          })
          .then((data: any) => {
            res.status(200).send({
              message: LOGIN.message,
              phoneNumber: phoneNumber,
              data,
            });
          });
        const token = jwtSign(data._id);
        if (!data) {
          res.json({ err: LOGIN.err });
        } else {
          res.json({ token, data });
        }
      } else {
        res.json({ error: LOGIN.error });
      }
    } catch (errr) {
      res.json({ errr: LOGIN.errr });
    }
  } else {
    res.json({ data: LOGIN.data });
  }
};

export default { signUp, login, verifyOtp };
