import { Schema } from "mongoose";

export interface commentOnQuestion{
    user_id:Schema.Types.ObjectId;
    q_id:Schema.Types.ObjectId;
    comment:String;
}