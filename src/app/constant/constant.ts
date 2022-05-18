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
  exp: 2 * 24 * 60 * 1000,
};

// class responseClass {
//   status = {
//     statusCode: 400,
//     status: false,
//     message: "Something went wrong",
//   };
// }

export const constant = {
  statusCode: {
    invalid: 400,
    serverError: 500,
    loginFailed: 401,
    success: 200,
    alreadyLoggedIn: 406,
    alreadyExist: 409,
    datanotFound: 404,
    signUpFailed:401
  },

  message: {
    success: "success",
    server: "server is running on port",
    connection: "connection successful!",
    signUpMsg: "Signup successful!",
    signUp: "User already exist.",
    signUpFail: "This email or phonenumber allready exist.",
    mediaSignUpfail:"Email allready exist",
    loginInvalidMsg: "Phone Number not matched.",
    loginFailed: "Phone number not matched or user profile is inactive.",
    authenticationFailed: "Verification failed.",
    invalidNumber: "Phone Number or otpcode not matched.",
    serverError: "internal server error",
    verifyMsg:"Verify successfully!",
    otpMsg:"Otp sent successfully!",
    postMsg:" Post uploaded ",
    postLikeMsg:"Post liked.",
    reviewMsg:"Review successful!",
    postCommentMsg:"Post Commented.",
    postDetailMsg:"Post id not matched.",
    likeMsg:"Post liked...",
    disLikeMsg:"Disliked post...",
    likeErrorMsg:"Post not found",
    disLikeErrorMsg:"Post not found",
    commentMsg:"Page not found"
  },
};

//export const responses = new responseClass();
