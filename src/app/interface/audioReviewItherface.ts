import { Schema } from "mongoose";

export interface audioReview {
    user_id: Schema.Types.ObjectId;
    title:String;
    description:String;
    like: Number;
    dislike: Number;
    comment: String;
  }
  
  