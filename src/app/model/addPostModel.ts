import mongoose from "mongoose";
import { Schema} from "mongoose";
import { post } from "../interface/userInterface";
const Model_Name = "addPost";

const addPostSchema = new Schema<post>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    imageUrl: {
      type: String,
    },
    title: {
      type: String,
    },
},
  { timestamps: true }
);
const addPost = mongoose.model<post>(Model_Name, addPostSchema);

export default addPost;


