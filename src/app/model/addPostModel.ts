import mongoose from "mongoose";
import { Schema, model, connect } from "mongoose";
import { post } from "../interface/userInterface";
const Model_Name = "addPost";

const addPostSchema = new Schema<post>(
  {
    _id: {
      type: String,
    },
    user_id: {
      type: [Schema.Types.ObjectId],
      ref: "user",
    },
    imageUrl: {
      type: String,
    },
    videoUrl: {
      type: String,
    },
    title: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    like: {
      type: [Schema.Types.ObjectId],
      ref: "like",
    },
    comment: {
      type: [Schema.Types.ObjectId],
      ref: "comment",
    },
  },
  { timestamps: true }
);
const addPost = mongoose.model<post>(Model_Name, addPostSchema);

export default addPost;
