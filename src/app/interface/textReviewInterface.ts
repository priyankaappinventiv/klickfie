import { Schema } from "mongoose";
export interface textReview {
    user_id:Schema.Types.ObjectId;
    title:String;
    description:String;
    like: Number;
    dislike: Number;
    comment: String;
  }