import { Schema } from "mongoose";

export interface userData{
  name:String,
  email:String,
  phoneNumber:String,
  imageUrl:String,
  code:String,
  title:String,
  isLiked:Boolean
}

export interface iUser {
  _id: String;
  name: String;
  email: String;
  phoneNumber?: String;
  imageUrl: String;
  interests?: [Schema.Types.ObjectId];
  is_active: Boolean;
  isLiked?:Boolean;
  createdAt: Date;
  updatedAt: Date;
}


