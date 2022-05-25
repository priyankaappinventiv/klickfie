import { Schema } from "mongoose";

export interface createQ{
    user_id:Schema.Types.ObjectId;
    question:String;
}