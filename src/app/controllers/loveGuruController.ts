import { constant } from "../constant/constant";
import { responses } from "../helper/response";
import { createQ } from "../interface/loveInterface";
import { HydratedDocument } from "mongoose";
import { Request, Response } from "express";
import askQuestion from "../model/loveModel";
import { commentOnQuestion } from "../interface/commentOnQInterface";
import commentOnQ from "../model/commentOnQModel";

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
  try {
    const data: Object = await askQuestion.find();
    console.log(data);
    if (!data) {
      responses.status.statusCode = 400;
      responses.status.status = false;
      responses.status.message = constant.message.postDetailMsg;
      res.status(constant.statusCode.success).json(responses.status);
    } else {
      res
        .status(constant.statusCode.success)
        .json({ statusCode: 200, status: true, data: data });
    }
  } catch (err) {
    responses.status.message = constant.message.serverError;
    responses.status.statusCode = 500;
    responses.status.status = false;
    res.status(constant.statusCode.serverError).json(responses.status);
  }
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
  const { q_id } = req.body;
  if (q_id) {
    const questionPostedBy = await askQuestion.aggregate([
      {
        $lookup: {
          from: "users", //Collection name
          localField: "user_id", //local field name
          foreignField: "_id", // foreignfield
          as: "loveGuru", //any thing you want to write.
        },
      },
      { $unwind: "$loveGuru" },
      {
        $project: {
          "loveGuru.name": 1,
          "loveGuru.imageUrl": 1,
          question: 1,
          createdAt: 1,
        },
      },
    ]);
    const commentedBy = await commentOnQ.aggregate([
      {
        $lookup: {
          from: "users", //Collection name
          localField: "user_id", //local field name
          foreignField: "_id", // foreignfield
          as: "commentBy", //any thing you want to write.
        },
      },
      { $unwind: "$commentBy" },
      {
        $project: {
          comment: 1,
          createdAt: 1,
          "commentBy.name": 1,
          "commentBy.imageUrl": 1,
        },
      },
    ]);
    res.status(200).json({ statusCode:200,status:true,questionPostedBy, commentedBy });
  } else {
    responses.status.statusCode = 400;
    responses.status.status = false;
    responses.status.message = constant.message.likeErrorMsg;
    res.status(constant.statusCode.success).json(responses.status);
  }
};

export default {
  askQuestions,
  commentOnQuestions,
  getAllQuestion,
  getSinglePostDetails,
};
