import { Schema } from "mongoose";

export interface userData{
  name:String,
  email:String,
  phoneNumber:String,
  code:String,
  title:String
}


export interface otpCode{
  code:String,
  createdAt: Date;
  updatedAt: Date;
}

export interface iUser {
  _id: String;
  name: String;
  email: String;
  phoneNumber?: String;
  imageUrl: String;
  interests?: [Schema.Types.ObjectId];
  is_active: Boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface post {
  _id: String;
  user_id: Schema.Types.ObjectId;
  imageUrl: String;
  videoUrl?: String;
  title: String;
  like: Number;
  comment: Number;
  createdAt: Date;
  updatedAt: Date;
}

export interface comment {
  _id: String;
  user_id: Schema.Types.ObjectId;
  post_id: Schema.Types.ObjectId;
  body: String;
  createdAt: Date;
  updatedAt: Date;
}

export interface like {
  _id: String;
  user_id: Schema.Types.ObjectId;
  post_id: Schema.Types.ObjectId;
  likePost: Number;
  createdAt: Date;
  updatedAt: Date;
}

export interface review {
  _id: String;
  user_id: String;
  text_message: Schema.Types.ObjectId;
  audio_message: Schema.Types.ObjectId;
  title: String;
  description: String;
  category: String;
  createdAt: Date;
  updatedAt: Date;
}

export interface text_message {
  _id: String;
  text_message_id: String;
  like: Number;
  dislike: Number;
  comment: String;
  createdAt: Date;
  updatedAt: Date;
}

export interface audio_message {
  _id: String;
  audio_message_id: String;
  like: Number;
  dislike: Number;
  comment: String;
  createdAt: Date;
  updatedAt: Date;
}

export interface strory {}

export interface interest {}
