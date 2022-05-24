import mongoose from "mongoose";
import { Schema } from "mongoose";
import { textReview } from "../interface/textReviewInterface";
const Model_Name = "review";

const textMsgSchema = new Schema<textReview>(
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
         type:Number
    },
    description: {
      type: String,
    },
    title: {
      type: String,
    },
    likePercent: {
      type: Number,
    },
  },

  { timestamps: true }
);

const textMsg = mongoose.model<textReview>(Model_Name, textMsgSchema);

export default textMsg;
