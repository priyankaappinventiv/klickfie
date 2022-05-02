import mongoose from "mongoose";
import { Schema } from "mongoose";
import { comment } from "../interface/userInterface";
const Model_Name = "commentModel";

const commentSchema = new Schema<comment>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      require: true,
    },
    post_id: {
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

const postComment = mongoose.model<comment>(Model_Name, commentSchema);

export default postComment;
