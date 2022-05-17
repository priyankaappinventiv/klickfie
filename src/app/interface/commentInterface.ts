
import { Schema } from "mongoose";
export interface comment {
    post_id: Schema.Types.ObjectId;
    user_id: Schema.Types.ObjectId;
    body: String;
  }
  
  