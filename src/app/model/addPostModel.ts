import mongoose from "mongoose";
import { Schema } from "mongoose";
import { post } from "../interface/postInterface";
const Model_Name = "userPost";

const addPostSchema = new Schema<post>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    imageUrl: {
      type: String,
    },
    title: {
      type: String,
    },
    like: [
      { type: Schema.Types.ObjectId,
       ref: "userLike" 
      }],
    comment: [
      { type: Schema.Types.ObjectId, 
        ref: "userComment" 
      }],
  },
  { timestamps: true }
);
const userPost = mongoose.model<post>(Model_Name, addPostSchema);

export default userPost;
