import mongoose from "mongoose";
import { Schema } from "mongoose";
import { audioReview } from "../interface/audioReviewItherface";
const Model_Name = "audioMsg";

const audioMsgSchema = new Schema<audioReview>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      require: true,
    },
    like:{
        type:Number
    },
    dislike:{
        type:Number
    },
    comment:{
         type:String
    },
    description: {
      type: String,
    },
    title: {
      type: String,
    },
  },

  { timestamps: true }
);

const audioMsg = mongoose.model<audioReview>(Model_Name, audioMsgSchema);

export default audioMsg;
