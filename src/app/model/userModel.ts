import mongoose from "mongoose";
import { Schema, model, connect } from "mongoose";
import { user } from "../interface/userInterface";
const Model_Name = "user";

const userSchema = new Schema<user>(
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
      type: Number,
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

const user = mongoose.model<user>(Model_Name, userSchema);

export default user;
