import { audioReview } from "./audioReviewItherface";
import { textReview } from "./textReviewInterface";

export interface moviesData {
  user_id: String;
  vedioUrl: String;
  movieName: String;
  category: String;
}

export interface review {
  user_id: String;
  vedioUrl: String;
  textReview: [textReview];
  audioReview: [audioReview];
  movieName: String;
  category: String;
}
