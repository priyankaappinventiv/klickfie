import * as dotenv from "dotenv";
const baseUrl = process.env.PORT;
dotenv.config();

export const DBURL = {
  url: process.env.DB_URL,
};

export const HOST = {
  host: process.env.HOST,
};

export const JWT = {
  key: process.env.JWTSECRET,
};

export const PORT = {
  baseUrl: process.env.PORT,
};

export const SWAGGER = {
  swaggerUrl: process.env.SWAGGER_URL,
};

export const TWILIO = {
  authToken: String(process.env.AUTH_TOKEN),
  accountSid: String(process.env.ACCOUNT_SID),
  serviceSid: String(process.env.SERVICE_SID),
};

export const JWTEXP = {
  exp:2 * 24 * 60 * 1000
}

export const SIGNUP = {
  error: "User already exist.",
  message: "Signup successfully"
};

export const VERIFYOTP = {
  status:"approved",
 // message: "twilio not working",
  msg:"User is Verified!!",
  err:"invalid otp",
  error: "Phone number or code does not matched.",
};

export const LOGIN = {
  message: "OTP sent successfully!!",
  error: "Phone number not matched or user profile is inactive.",
  errr: "Some thing went wrong.",
  data:"Phone Number not matched."
};

export let STATUS_MSG = {
  ERROR: {
      BAD_REQUEST: {
          statusCode: 400,
          success: false,
          message: "BAD REQUEST",
          type: "BAD_REQUEST"
      },
      OTPVERIFY: {
        statusCode: 400,
        success: false,
        message: "otp not matched.",
        type: "BAD_REQUEST"
    },
      INCORRECT_CREDENTIALS: {
          statusCode: 400,
          success: false,
          message: "Incorrect credentials. Please try again",
          type: "INCORRECT_CREDENTIALS"
      },
      DB_ERROR: {
          statusCode: 400,
          success: false,
          message: 'DB Error : ',
          type: 'DB_ERROR'
      },
      INVALID_TOKEN: {
          statusCode: 401,
          success: false,
          message: 'Invalid token provided',
          type: 'INVALID_TOKEN'
      }, 
    },

  SUCCESS: {
      DEFAULT: {
          statusCode: 200,
          success: true,
          message: 'Success',
          type: 'DEFAULT'
      },
      CREATED: {
          statusCode: 200,
          success: true,
          message: 'Created Successfully',
          type: 'CREATED'
      },
      OTPGET: {
        statusCode: 200,
        success: true,
        message: 'Otp sent Successfully',
        name: 'OTPGET'
      },
      OTPVERIFY: {
        statusCode: 200,
        success: true,
        message: 'Otp verify Successfully',
        name: 'OTPVERIFY'
      },
      LOGIN: {
          statusCode: 200,
          success: true,
          message: 'Log In Successful',
          type: 'LOGIN'
      },     
    }  }


    export const Constants = {
      statusCode: {
          invalid: 400,
          loginFaild: 401,
          sucess: 200,
          alreadyLoggedIn:406,
          alreadyExist:409,
          notFound:404
      },
      messages:{
          userAlreadyLoggedIn:"U r alerady Logged in...",
          invalidUserId:"Enter Valid userId",
          invalidPassword:"Enter Valid Password",
          sucess:'Welcome to Mutelcore Family',
          invalidUser:"User Not Found",
          mailSentSucess:"email sent to ur mail i'd",
          otpSentSucess:"otp sent Sucessfully...",
          invalidOtp:"Invalid Otp...",
          passwordResetSucess:"Password Reset Sucessfully...",
          fileMissing:`file missing... accept only .png .jpg .jpeg file`,
          userAlreadyExist:'User already exist',
          profileUpdate:"Profile Update Sucessfully..."
  
      }
  }
  
  export class userResponse {
      status = {
          code: 400,
          status: false,
          message: "Something went wrong"
  
      }
  }

    //class ResponceClass{
      //   ERROR_MSG (){
      //     return {
      //     success:false,
      //     statuscode:400,
      //     message:"some thing went wrong.",
      //     }
      //  }
      
      //   statuscode(){
      //     invalid:400;
      //     success:200;
      //     create:201;
      //   }
      
      //   message(){
      //     invalid:"Phone number not matched.";
      //     success:"Login Successfully";
      //     create:"Created Successfully"
          
      //   }
      
