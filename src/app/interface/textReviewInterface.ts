import { Schema } from "mongoose";
export interface textReview {
    movie_id:Schema.Types.ObjectId;
    user_id:Schema.Types.ObjectId;
    title:String;
    description:String;
    like?: Number;
    dislike?: Number;
    comment?: Number;
    likePercent: Number;
  }