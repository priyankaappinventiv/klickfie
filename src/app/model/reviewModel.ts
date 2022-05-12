import mongoose from "mongoose";
import { Schema } from "mongoose";
import { review } from "../interface/reviewInterface";
const Model_Name = "Review";

const reviewSchema = new Schema<review>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    vedioUrl:{
        type:String
    },
    movieName: {
      type: String,
    },    
    category:{
      type:String
    } ,
    textReview: [
      { type: Schema.Types.ObjectId,
       ref: "textMsg" 
      }],
    audioReview: [
      { type: Schema.Types.ObjectId, 
        ref: "audioMsg" 
      }], 
  },
  { timestamps: true }
);
const Review = mongoose.model<review>(Model_Name, reviewSchema);

export default Review;
