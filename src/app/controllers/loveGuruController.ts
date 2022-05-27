import { constant } from "../constant/constant";
import { responses } from "../helper/response";
import { createQ } from "../interface/loveInterface";
import { HydratedDocument } from "mongoose";
import { Request, Response } from "express";
import askQuestion from "../model/loveModel";
import { commentOnQuestion } from "../interface/commentOnQInterface";
import commentOnQ from "../model/commentOnQModel";
import {Types} from "mongoose"

const askQuestions = async (req: Request, res: Response): Promise<void> => {
  try {
    const { question } = req.body;
    const userId: string = req.body._id;
    const query: HydratedDocument<createQ> | null = new askQuestion({
      user_id: userId,
      question: question,
    });
    const data: HydratedDocument<createQ> | null = await query.save();
    responses.status.statusCode = 200;
    responses.status.status = true;
    responses.status.message = constant.message.createqMsg;
    res.status(constant.statusCode.success).json(responses.status);
  } catch (err: any) {
    responses.status.message = constant.message.serverError;
    responses.status.statusCode = 500;
    responses.status.status = false;
    res.status(constant.statusCode.serverError).json(responses.status);
  }
};

const getAllQuestion = async (req: Request, res: Response): Promise<any> => {
  const getQueryDetails = await askQuestion.aggregate([
    {
      $lookup: {
        from: "users",
        foreignField: "_id",
        localField: "user_id",
        as: "result",
      },
    },
    { $unwind: "$result" },
    {
      $lookup: {
        from: "commentonqs",
        foreignField: "q_id",
        localField: "_id",
        as: "final",
      },
    },
    {
      $addFields: {
        lastComments: { $slice: ["$final", -1] },
      },
    },

    {
      $lookup: {
        from: "users",
        localField: "lastComments.user_id",
        foreignField: "_id",
        as: "lastUser",
      },
    },
    {
      $project: {
        _id: 1,
        question: 1,
        createdAt: 1,
        "result.imageUrl": 1,
        "lastComments.comment": 1,
        "lastUser.name": 1,
        totalComments: { $size: "$final" },
      },
    },
    {
      $sort: { createdAt: -1 },
    },
  ]);
  return res
    .status(200)
    .json({ statusCode: 200, status: true, data: getQueryDetails });
};

const commentOnQuestions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { comment, q_id } = req.body;
    const userId: string = req.body._id;
    const commentOnQuery: HydratedDocument<commentOnQuestion> | null =
      new commentOnQ({
        user_id: userId,
        q_id: q_id,
        comment: comment,
      });
    const data: HydratedDocument<commentOnQuestion> | null =
      await commentOnQuery.save();
    responses.status.statusCode = 200;
    responses.status.status = true;
    responses.status.message = constant.message.commentQueryMsg;
    res.status(constant.statusCode.success).json(responses.status);
  } catch (err: any) {
    responses.status.message = constant.message.serverError;
    responses.status.statusCode = 500;
    responses.status.status = false;
    res.status(constant.statusCode.serverError).json(responses.status);
  }
};

const getSinglePostDetails = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const q_id=new Types.ObjectId(req.body.q_id);
    const userQueryDetails = await askQuestion.aggregate(
      [
        { $match: { _id: { $eq: q_id } } },
        {
          $lookup: {
            from: "users",
            foreignField: "_id",
            localField: "user_id",
            as: "userDetails",
          },
        },
        {
          $lookup: {
            from: "commentonqs",
            foreignField: "q_id",
            localField: "_id",
            pipeline: [
              {
                $lookup: {
                  from: "users",
                  foreignField: "_id",
                  localField: "user_id",
                  as: "commentUser",
                },
              },
            ],
            as: "Comments",
          },
        },
        {
          $project: {
            _id: 1,
            question: 1,
            createdAt: 1,
            "userDetails.name": 1,
            "userDetails.imageUrl": 1,
            "Comments.comment": 1,
            "Comments.createdAt": 1,
            "Comments.commentUser.name": 1,
            "Comments.commentUser.imageUrl": 1,
          },
        },
      ]
    );
    return res
    .status(200)
    .json({ statusCode: 200, status: true, data: userQueryDetails });
  } catch (error: any) {
    return res.status(400).json({ statusCode: 200, status: true, message: "Id not matched." });
  }
};

export default {
  askQuestions,
  commentOnQuestions,
  getAllQuestion,
  getSinglePostDetails,
};
