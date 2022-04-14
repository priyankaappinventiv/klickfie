import * as dotenv from "dotenv";
const baseUrl = process.env.PORT;
dotenv.config();

export const DBURL = {
  url: process.env.DB_URL,
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

export const SIGNUP = {
  error: "User already exist.",
  message: "Data can not fetched.",
  err: "SignUp Failed.",
};

export const VERIFYOTP = {
  message: "User is Verified!!",
  error: "Phone number or code does not matched.",
};

export const LOGIN = {
  message: "OTP sent successfully!!",
  err: "Data not get.",
  error: "Phone number not matched.",
  data: "Please active your profile.",
  errr: "Some thing went wrong.",
};
