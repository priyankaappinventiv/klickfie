import { HydratedDocument } from "mongoose";
import { Request, Response } from "express";
import { userData } from "../interface/userInterface";
import { post } from "../interface/postInterface";
import { like } from "../interface/likeInterface";
import { comment } from "../interface/commentInterface";
import { responses } from "../helper/response";
import { constant } from "../constant/constant";
import userPost from "../model/addPostModel";
import userLike from "../model/likeModel";
import userComment from "../model/commentModel";

const addPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId: string = req.body._id;
    const { title, imageUrl }: userData = req.body;
    const userPosts: HydratedDocument<post> | null = new userPost({
      user_id: userId,
      title: title,
      imageUrl: imageUrl,
    });
    const data: HydratedDocument<post> | null = await userPosts.save();
    responses.status.statusCode = 200;
    responses.status.status = true;
    responses.status.message = constant.message.postMsg;
    res.status(constant.statusCode.success).json(responses.status);
  } catch (err: any) {
    responses.status.message = constant.message.serverError;
    responses.status.statusCode = 500;
    responses.status.status = false;
    res.status(constant.statusCode.serverError).json(responses.status);
  }
};



// const getPostDetails = async (req: Request, res: Response): Promise<any> => {
//   try {
//     const data = await userPost
//       .findOne({ _id: req.body.post_id })
//       .populate("like")
//       .populate("comment")
//       .lean();
//     if (!data) {
//       return res.status(400).json({ message: "Post id not matched." });
//     }
//     res.json(data);
//   } catch (err) {
//     res.json(err);
//   }
// };


const getPostDetails = async (req: Request, res: Response): Promise<any> => {
  try {
    const data:String = await userPost
      .findOne({ _id: req.body.post_id })
      .populate("like")
      .populate("comment")
      .lean();
      console.log(data)
    if (!data) {
      responses.status.statusCode = 400;
      responses.status.status = false;
      responses.status.message = constant.message.postDetailMsg;
      res.status(constant.statusCode.success).json(responses.status);
    } else {
      // responses.status.statusCode = 200;
      // responses.status.status = true;
      // responses.status.message = data;
      // res.status(constant.statusCode.success).json(responses.status);
      res.status(200).json(data)
    }
  } catch (err) {
    responses.status.message = constant.message.serverError;
    responses.status.statusCode = 500;
    responses.status.status = false;
    res.status(constant.statusCode.serverError).json(responses.status);
  }
};

const postLikes = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId: string = req.body._id;
    const info: HydratedDocument<like> | null = new userLike({
      user_id: userId,
      likePost: req.body.likePost,
    });
    const data: HydratedDocument<like> | null = await info.save();
    await userPost.updateOne(
      { _id: req.body.post_id },
      { $push: { like: data._id } }
    );
    responses.status.statusCode = 200;
    responses.status.status = true;
    responses.status.message = constant.message.postLikeMsg;
    res.status(constant.statusCode.success).json(responses.status);
  } catch (err: any) {
    responses.status.message = constant.message.serverError;
    responses.status.statusCode = 500;
    responses.status.status = false;
    res.status(constant.statusCode.serverError).json( responses.status);
  }
};

const commentPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId: string = req.body._id;
    const data: HydratedDocument<comment> | null = new userComment({
      user_id: userId,
      body: req.body.body,
    });
    const info: HydratedDocument<comment> | null = await data.save();
    await userPost.updateOne(
      { _id: req.body.post_id },
      { $push: { comment: info._id } }
    );
    responses.status.statusCode = 200;
    responses.status.status = true;
    responses.status.message = constant.message.postCommentMsg;
    res.status(constant.statusCode.success).json(responses.status);
  } catch (err: any) {
    responses.status.message = constant.message.serverError;
    responses.status.statusCode = 500;
    responses.status.status = false;
    res.status(constant.statusCode.serverError).json(responses.status);
  }
};

export default {
  addPosts,
  getPostDetails,
  postLikes,
  commentPost,
};
