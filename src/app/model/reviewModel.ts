import mongoose from "mongoose";
import { Schema } from "mongoose";
import { movie } from "../interface/movieInterface";
const Model_Name = "Review";

const reviewSchema = new Schema<movie>(
  {
    vedioUrl:{
        type:String
    },
    movieName: {
      type: String,
    },    
    category:{
      type:[String]
    } ,
  },
  { timestamps: true }
);
const Review = mongoose.model<movie>(Model_Name, reviewSchema);

export default Review;
