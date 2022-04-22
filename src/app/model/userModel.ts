import mongoose from "mongoose";
import { Schema, model, connect } from "mongoose";
import { iUser } from "../interface/userInterface";
const Model_Name = "user";

const userSchema = new Schema<iUser>(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      unique: true,
      require: true,
    },
    phoneNumber: {
      type: String,
      unique: true,
      require: true,
    },
    imageUrl: {
      type: String,
      require: true,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },

  { timestamps: true }
);

const user = mongoose.model<iUser>(Model_Name, userSchema);

export default user;
