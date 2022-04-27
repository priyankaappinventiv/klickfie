import mongoose from "mongoose";
import { Schema, model, connect } from "mongoose";
import { otpCode } from "../interface/userInterface";
const Model_Name = "Otp";

const otpSchema = new Schema<otpCode>(
  {
    code: {
      type: String,
      require: true,
    },  
  },
  { timestamps: true }
);

const Otp = mongoose.model<otpCode>(Model_Name,otpSchema);

export default Otp;
