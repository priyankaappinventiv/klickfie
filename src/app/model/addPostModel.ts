import mongoose from "mongoose";
import { Schema, model, connect } from "mongoose";
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
},
  { timestamps: true }
);
const addPost = mongoose.model<post>(Model_Name, addPostSchema);

export default addPost;

// const Schema = mongoose.Schema;

// const PostSchema = new Schema(
//   {
//     title: { type: String, required: [true, "Please enter title"] },
//     description: { type: String },
//     category: { type: String },
//     enableNotification: { type: Boolean },
//     privacy: { type: String },
//     tags: { type: Array },
//     coverImage: { type: String },
//     media: { type: Array },
//     address: { type: String },
//     latitude: { type: Number },
//     longitude: { type: Number },
//     postedBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//     toObject: {
//       virtuals: true,
//     },
//     toJSON: {
//       virtuals: true,
//     },
//   }
// );

// PostSchema.virtual("likeCount", {
//   ref: "Like",
//   localField: "_id",
//   foreignField: "postId",
//   count: true,
// });

// PostSchema.virtual("likes", {
//   ref: "Like",
//   localField: "_id",
//   foreignField: "postId",
// });

// PostSchema.virtual("comments", {
//   ref: "Comment",
//   localField: "_id",
//   foreignField: "postId",
// });

// PostSchema.virtual("shares", {
//   ref: "Share",
//   localField: "_id",
//   foreignField: "postId",
// });

// PostSchema.index({ title: "text", description: "text", address: "text" });

// module.exports = mongoose.model("Post", PostSchema);
