import { Schema } from "mongoose";

export interface post {
    _id: String;
    user_id: Schema.Types.ObjectId;
    imageUrl: String;
    videoUrl?: String;
    title: String;
    like: Number;
    comment: String;
    isLiked?:Boolean;
    createdAt: Date;
    updatedAt: Date;
  }

  