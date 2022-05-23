import { HydratedDocument } from "mongoose";
import { Request, Response } from "express";
import { iUser, userData } from "../interface/userInterface";
import { post } from "../interface/postInterface";
import { comment } from "../interface/commentInterface";
import { responses } from "../helper/response";
import { constant } from "../constant/constant";
import userPost from "../model/addPostModel";
import userComment from "../model/commentModel";
import user from "../model/userModel";

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
    const data: string = await userPost
      .findOne({ _id: req.body.post_id })
      .populate("like")
      .populate("comment")
      .lean();
    console.log(data);
    if (!data) {
      responses.status.statusCode = 400;
      responses.status.status = false;
      responses.status.message = constant.message.postDetailMsg;
      res.status(constant.statusCode.success).json(responses.status);
    } else {
      responses.status.statusCode = 200;
      responses.status.status = true;
      responses.status.message = data;
      res.status(constant.statusCode.success).json(responses.status);
    }
  } catch (err) {
    responses.status.message = constant.message.serverError;
    responses.status.statusCode = 500;
    responses.status.status = false;
    res.status(constant.statusCode.serverError).json(responses.status);
  }
};

const getAllPost = async (req: Request, res: Response): Promise<any> => {
  const allPostDetails = await userPost.aggregate([
    {
      $lookup: {
        from: "users", //Collection name
        localField: "user_id", //local field name
        foreignField: "_id", // foreignfield
        as: "postCreatedBy", //any thing you want to write.
      },
    },
    { $unwind: "$postCreatedBy" },
    {
      $lookup: {
        from: "usercomments",
        localField: "_id",
        foreignField: "post_id",
        as: "totalComments",
      },
    },
    {
      $addFields: {
        lastestComment: { $slice: ["$totalComments", -1] },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "lastestComment.user_id",
        foreignField: "_id",
        as: "commentedBy",
      },
    },
    {
      $project: {
        user_id: 1,
        imageUrl: 1,
        title: 1,
        like: 1,
        createdAt: 1,
        "postCreatedBy.name": 1,
        "postCreatedBy.imageUrl": 1,
        totalComments: { $size: "$totalComments" },
        "lastestComment.body": 1,
        "commentedBy.name": 1,
      },
    },
    {
      $sort: { _id: -1 },
    },
  ]);
  res.status(200).json(allPostDetails);
};

const postLikes = async (req: Request, res: Response): Promise<any> => {
  try {
    const postId: any = req.body.post_id;
    const userId: string = req.body._id;
    const is_Liked: HydratedDocument<iUser> | null = await user.findById(userId);
    const isUser: HydratedDocument<post> | null = await userPost.findById(postId);
    if (!isUser) {
      responses.status.statusCode = 401;
      responses.status.status = false;
      responses.status.message = constant.message.likeErrorMsg;
      res.status(constant.statusCode.success).json(responses.status);
    } else {
      if (is_Liked?.isLiked === false) {
        const postLiked: any = isUser?.like;
        await userPost.findByIdAndUpdate(
          postId,
          {
            $set: {
              like: postLiked === undefined ? 1 : postLiked + 1,
              isLiked: true,
            },
          },
          {
            new: true,
          }
        );
        responses.status.statusCode = 200;
        responses.status.status = true;
        responses.status.message = constant.message.likeMsg;
        res.status(constant.statusCode.success).json(responses.status);
      } else {
        let postLiked: any = isUser?.like;
        await userPost.findByIdAndUpdate(
          postId,
          {
            $set: {
              like: postLiked === undefined ? 1 : postLiked - 1,
              isLiked: false,
            },
          },
          {
            new: true,
          }
        );
        responses.status.statusCode = 200;
        responses.status.status = true;
        responses.status.message = constant.message.disLikeMsg;
        res.status(constant.statusCode.success).json(responses.status);
      }
    }
  } catch (err: any) {
    console.log(err);
  }
};

const commentPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId: string = req.body._id;
    const postId: string = req.body.post_id;
    const postDetails: HydratedDocument<post> | null = await userPost.findById(
      postId
    );
    if (postDetails) {
      const data: HydratedDocument<comment> | null = new userComment({
        post_id: postId,
        user_id: userId,
        body: req.body.body,
      });
      const info: HydratedDocument<comment> | null = await data.save();
      responses.status.statusCode = 200;
      responses.status.status = true;
      responses.status.message = constant.message.postCommentMsg;
      res.status(constant.statusCode.success).json(responses.status);
    } else {
      responses.status.statusCode = 401;
      responses.status.status = false;
      responses.status.message = constant.message.commentMsg;
      res.status(constant.statusCode.success).json(responses.status);
    }
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
  getAllPost,
  postLikes,
  commentPost,
};
