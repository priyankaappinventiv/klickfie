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






    
   class responseClass {
      status = {
          statusCode: 400,
          status: false,
          message: "Something went wrong",
      }
    }
    
    
 export  const constant = {
      statusCode: {
          invalid: 400,
          serverError:500,
          loginFailed: 401,
          success: 200,
          alreadyLoggedIn:406,
          alreadyExist:409,
          datanotFound:404
      },
    
      message:{
        success: 'success',
        server: "server is running on port",
        connection:"connection successful!", 
        signUp:"User already exist.", 
        loginInvalidMsg:"Phone Number not matched.",
        loginFailed: "Phone number not matched or user profile is inactive.",
        authenticationFailed: "Verification failed.",
        invalidNumber:"Phone Number or otpcode not matched.",
        serverError: "internal server error"

      },
    
    }    

export   const responses = new responseClass();
    