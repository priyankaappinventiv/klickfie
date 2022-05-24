import { HydratedDocument } from "mongoose";
import { Request, Response } from "express";
import { moviesData, movie} from "../interface/movieInterface";
import Movie from "../model/reviewModel";
import { responses } from "../helper/response";
import { constant } from "../constant/constant";
import review from "../model/textReviewModel";
import { textReview } from "../interface/textReviewInterface";

const madAboutMovies = async (req: Request, res: Response): Promise<void> => {
    try {
      const { vedioUrl,movieName,category }: moviesData = req.body;
      const movies: HydratedDocument<movie> | null = new Movie({
        movieName:movieName,
        vedioUrl:vedioUrl,
        category:category
      });
      const data: HydratedDocument<movie> | null = await movies.save();
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

const getmovieDetails = async (req: Request, res: Response): Promise<any> => {
    try {
      const postId: any = req.body.post_id;
      const data: string|null = await  Movie.findById(postId);
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

  const  getAllMovieDetails = async (req: Request, res: Response): Promise<any> => {
    try {
      const data: Object= await  Movie.find();
      console.log(data);
      if (!data) {
        responses.status.statusCode = 400;
        responses.status.status = false;
        responses.status.message = constant.message.postDetailMsg;
        res.status(constant.statusCode.success).json(responses.status);
      } else {
        res.status(constant.statusCode.success).json({statusCode:200,status:true,data:data});
      }
    } catch (err) {
      responses.status.message = constant.message.serverError;
      responses.status.statusCode = 500;
      responses.status.status = false;
      res.status(constant.statusCode.serverError).json(responses.status);
    }
  };
     

const textReviews = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId: string = req.body._id;
      const {description,title,likePercent}=req.body;     
      const info: HydratedDocument<textReview> | null = new review({
        user_id: userId,
        title:title,
        description:description,
        likePercent:likePercent
      });
      const data: HydratedDocument<textReview> | null = await info.save();
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



const likeReview = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId: any = req.body.post_id;
    const postDetails: HydratedDocument<textReview> | null = await review.findById(
      userId
    );
    if (!postDetails) {
      responses.status.statusCode = 401;
      responses.status.status = false;
      responses.status.message = constant.message.likeErrorMsg;
      res.status(constant.statusCode.success).json(responses.status);
    }
    let postLiked: any = postDetails?.like;
    await review.findByIdAndUpdate(
      userId,
      {
        $set: {
          like: postLiked === undefined ? 1 : postLiked + 1,
        },
      },
      {
        new: true,
      }
    );
    responses.status.statusCode = 200;
    responses.status.status = true;
    responses.status.message = constant.message.likeMsg;
    res.status(constant.statusCode.success).json( responses.status);
  } catch (err: any) {
    console.log(err);
  }
};


// const disLikeReview = async (req: Request, res: Response): Promise<any> => {
//   try {
//     const userId: any = req.body.post_id;
//     const postDetails: HydratedDocument<post> | null = await userPost.findById(
//       userId
//     );
//     if (!postDetails) {
//       responses.status.statusCode = 401;
//       responses.status.status = false;
//       responses.status.message = constant.message.likeErrorMsg;
//       res.status(constant.statusCode.success).json(responses.status);
//     }
//     let postLiked: any = postDetails?.like;
//     await userPost.findByIdAndUpdate(
//       userId,
//       {
//         $set: {
//           like: postLiked === undefined ? 1 : postLiked + 1,
//         },
//       },
//       {
//         new: true,
//       }
//     );
//     responses.status.statusCode = 200;
//     responses.status.status = true;
//     responses.status.message = constant.message.likeMsg;
//     res.status(constant.statusCode.success).json( responses.status);
//   } catch (err: any) {
//     console.log(err);
//   }
// };

// };


export default {
    madAboutMovies,
    getmovieDetails,
    getAllMovieDetails,
    textReviews,
    likeReview
};
  
  
  