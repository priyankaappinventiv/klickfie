import { HydratedDocument } from "mongoose";
import { Request, Response } from "express";
import { moviesData, review } from "../interface/reviewInterface";
import Review from "../model/reviewModel";
import { responses } from "../helper/response";
import { constant } from "../constant/constant";
import { textReview } from "../interface/textReviewInterface";
import { audioReview } from "../interface/audioReviewItherface";
import textMsg from "../model/textReviewModel";
import audioMsg from "../model/audioReviewModel";
import { title } from "process";


const madAboutMovies = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId: string = req.body._id;
      const { vedioUrl,movieName,category }: moviesData = req.body;
      const movies: HydratedDocument<review> | null = new Review({
        user_id: userId,
        movieName:movieName,
        vedioUrl:vedioUrl,
        category:category
      });
      const data: HydratedDocument<review> | null = await movies.save();
      responses.status.statusCode = 200;
      responses.status.status = true;
      responses.status.message = constant.message.postMsg;
      res.status(constant.statusCode.success).json(responses.status);
    } catch (err: any) {
      responses.status.message = constant.message.serverError;
      responses.status.statusCode = 500;
      responses.status.status = false;
      res.status(constant.statusCode.serverError).json({ responses });
    }
  };

  const textReview = async (req: Request, res: Response): Promise<void> => {
    try {
      const {like,dislike,comment,description}=req.body;
      const userId: string = req.body._id;
      const info: HydratedDocument<textReview> | null = new textMsg({
        user_id: userId,
        like:like,
        dislike:dislike,
        comment:comment,
        title:title,
        description:description
      });
      const data: HydratedDocument<textReview> | null = await info.save();
      await Review.updateOne(
        { _id: req.body.post_id },
        { $push: { textReview: data._id } }
      );
      responses.status.statusCode = 200;
      responses.status.status = true;
      responses.status.message = constant.message.reviewMsg;
      res.status(constant.statusCode.success).json(responses.status);
    } catch (err: any) {
      responses.status.message = constant.message.serverError;
      responses.status.statusCode = 500;
      responses.status.status = false;
      res.status(constant.statusCode.serverError).json( responses.status);
    }
  };  

  const audioReview = async (req: Request, res: Response): Promise<void> => {
    try {
      const {like,dislike,comment,audioUrl,title}=req.body;
      const userId: string = req.body._id;
      const info: HydratedDocument<audioReview> | null = new audioMsg({
        user_id: userId,
        like:like,
        dislike:dislike,
        comment:comment,
        title:title,
        audioUrl:audioUrl,
      });
      const data: HydratedDocument<textReview> | null = await info.save();
      await Review.updateOne(
        { _id: req.body.post_id },
        { $push: { audioReview: data._id } }
      );
      responses.status.statusCode = 200;
      responses.status.status = true;
      responses.status.message = constant.message.reviewMsg;
      res.status(constant.statusCode.success).json(responses.status);
    } catch (err: any) {
      responses.status.message = constant.message.serverError;
      responses.status.statusCode = 500;
      responses.status.status = false;
      res.status(constant.statusCode.serverError).json( responses.status);
    }
  };  

  const getMoviesPostDetails = async (req: Request, res: Response): Promise<any> => {
    try {
      const data:String = await Review
        .findOne({ _id: req.body.post_id })
        .populate("textReview")
        .populate("audioReview")
        .lean();
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

export default {
    madAboutMovies,
    textReview,
    audioReview,
    getMoviesPostDetails
};
  
  
  