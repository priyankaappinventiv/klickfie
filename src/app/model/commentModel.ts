import mongoose from "mongoose";
import { Schema } from "mongoose";
import { comment } from "../interface/commentInterface";
const Model_Name = "userComment";

const commentSchema = new Schema<comment>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      require: true,
    },
    body: {
      type: String,
      require:true,
    },
  },

  { timestamps: true }
);

const userComment = mongoose.model<comment>(Model_Name, commentSchema);

export default userComment;
