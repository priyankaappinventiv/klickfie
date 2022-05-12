import { Schema } from "mongoose";
  
  export interface like {
    _id: String;
    user_id: Schema.Types.ObjectId;
    likePost: Number;
  }