import mongoose from "mongoose";
import { Schema } from "mongoose";
import { like } from "../interface/likeInterface";
const Model_Name = "userLike";

const likeSchema = new Schema<like>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      require: true,
    },
    likePost: {
      type: Number,
      enum: [1, 2, 3, 4],
      default: 1,
    },
  },

  { timestamps: true }
);

const userLike = mongoose.model<like>(Model_Name, likeSchema);

export default userLike;
