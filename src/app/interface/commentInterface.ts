
import { Schema } from "mongoose";
export interface comment {
    _id: String;
    user_id: Schema.Types.ObjectId;
    body: String;
  }
  
  