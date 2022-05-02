import twilio from "twilio";
import { STATUS_MSG } from "../constant/constant";
import { TWILIO } from "../constant/constant";
const client: twilio.Twilio = twilio(TWILIO.accountSid, TWILIO.authToken);

class otpService {
  async getOTP(phoneNumber: string): Promise<string> {
    try {
      const data = await client.verify
        .services(TWILIO.serviceSid)
        .verifications.create({ to: `+${phoneNumber}`, channel: "sms" });
        return Promise.resolve(STATUS_MSG.SUCCESS.OTPGET.message);
    } catch (err: any) {
      return Promise.reject(err.message);
    }
  }

  async generateOTP(phoneNumber:String) {
    const  digits = '9170802978';
    let OTP = '';
    for (let i = 0; i < 4; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

//   async verifyOTP(phoneNumber: string, code: string): Promise<any> {
//     try {
//         client.verify
//         .services(TWILIO.serviceSid)
//         .verificationChecks.create({ to: `+${phoneNumber}`, code: code })
//         .then((data)=> {
//             if (data.status == "approved") {
//               return Promise.resolve(STATUS_MSG.SUCCESS.OTPVERIFY);      
//             }          
//         })  
//     } catch (err: any) {
//       return Promise.reject(STATUS_MSG.ERROR.OTPVERIFY);
//     }
//   }
  }

export const otp = new otpService();
