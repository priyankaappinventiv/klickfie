import mongoose from "mongoose";
import { Schema} from "mongoose";
import { commentOnQuestion } from "../interface/commentOnQInterface";


const Model_Name = "commentOnQ";

const createCommentSchema = new Schema<commentOnQuestion>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
    },
    q_id: {
        type: Schema.Types.ObjectId,
    },
    comment: {
        type:String,
        require: true,
    }
  },

{ timestamps: true }
);

const commentQuestion = mongoose.model<commentOnQuestion>(Model_Name, createCommentSchema);

export default commentQuestion;    