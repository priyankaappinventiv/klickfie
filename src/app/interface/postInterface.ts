import { Schema } from "mongoose";
import { comment } from "./commentInterface";
import { like } from "./likeInterface";


export interface post {
    _id: String;
    user_id: Schema.Types.ObjectId;
    imageUrl: String;
    videoUrl?: String;
    title: String;
    like: [like];
    comment: [comment];
    createdAt: Date;
    updatedAt: Date;
  }

  