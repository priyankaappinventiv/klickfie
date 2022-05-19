import authUser from "../controllers/userController";
import authMovies from "../controllers/moviesController";
import express from "express";
import signUpValidate from "../validator/signUpvalidator";
import loginValidate from "../validator/loginValidator";
import tokenVerify from "../services/verifyToken";
import authPost from "../controllers/postController";
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     signUpDataModel:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - phoneNumber
 *       properties:
 *         name:
 *           type: string
 *           description: name
 *         email:
 *           type: string
 *           description: email
 *         phoneNumber:
 *           type: Number
 *           description: phone Number
 *         imageUrl:
 *           type: string
 *           description: image Url
 *       example:
 *         name: priyankapatel
 *         email: priyankapatel@gmail.com
 *         phoneNumber: "9170802978"
 *         imageUrl: "http://localhost:3009/file_1649397216117.png"
 *
 */

/**
 * @swagger
 * /signUp:
 *  post:
 *      summary: Used to insert data in database
 *      tags:
 *          - OnBoarding API's
 *      description: user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/signUpDataModel'
 *      responses:
 *          200:
 *              description: Data inserted.
 */

router.post("/signUp", signUpValidate, authUser.signUp);

/**
 * @swagger
 * components:
 *   schemas:
 *     loginDataModel:
 *       type: object
 *       required:
 *         - phoneNumber
 *       properties:
 *         phoneNumber:
 *           type: Number
 *           description: phone Number
 *       example:
 *         phoneNumber: "9170802978"
 *
 */

/**
 * @swagger
 * /login:
 *  post:
 *      summary: Used to login user.
 *      tags:
 *          - OnBoarding API's
 *      description: user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/loginDataModel'
 *      responses:
 *          200:
 *              description: Login successfully.
 */

router.post("/login", loginValidate, authUser.login);

/**
 * @swagger
 * components:
 *   schemas:
 *     verifyDataModel:
 *       type: object
 *       required:
 *         - phoneNumber
 *         - code
 *       properties:
 *         phoneNumber:
 *           type: Number
 *           description: phone Number
 *         code:
 *           type: Number
 *           description: verify code
 *       example:
 *         phoneNumber: "9170802978"
 *         code: "9212"
 *
 */

/**
 * @swagger
 * /verifyOtp:
 *  post:
 *      summary: Used to verify user is valid or not.
 *      tags:
 *          - OnBoarding API's
 *      description: user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/verifyDataModel'
 *      responses:
 *        200:
 *          description: Get data successfully.
 */

router.post("/verifyOtp", authUser.verifyOtp);

/**
 * @swagger
 * components:
 *   schemas:
 *     fbDataModel:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         name:
 *           type: string
 *           description: name
 *         email:
 *           type: string
 *           description: email
 *       example:
 *         name: priyanka
 *         email: priyankapatel@gmail.com
 *
 */

/**
 * @swagger
 * /socialMediaFb:
 *  post:
 *      summary: Used to Signup user throgh socail media.
 *      tags:
 *          - OnBoarding API's
 *      description: user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/fbDataModel'
 *      responses:
 *          200:
 *              description: Data inserted.
 */

router.post("/socialMediaFb", authUser.socialMediaFb);

/**
 * @swagger
 * components:
 *   schemas:
 *     googleDataModel:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         name:
 *           type: string
 *           description: name
 *         email:
 *           type: string
 *           description: email
 *       example:
 *         name: priyanka
 *         email: priyankapatel@gmail.com
 *
 */

/**
 * @swagger
 * /socialMediaGoogle:
 *  post:
 *      summary: Used to Signup user throgh socail media.
 *      tags:
 *          - OnBoarding API's
 *      description: user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/googleDataModel'
 *      responses:
 *          200:
 *              description: Data inserted.
 */

router.post("/socialMediaGoogle", authUser.socialMediaGoogle);

/**
 * @swagger
 * components:
 *   schemas:
 *     addPostDataModel:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *           description: Title
 *         image:
 *           type: string
 *           description: image Url
 *       example:
 *         title: This is my post.
 *         imageUrl: "http://localhost:3009/file_1649397216117.png"
 *
 */

/**
 * @swagger
 * /addPost:
 *  post:
 *      summary: Used to add post on social media.
 *      tags:
 *          - User Post API's
 *      description: user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/addPostDataModel'
 *      responses:
 *          200:
 *              description: Post Uploaded..
 */

router.post("/addPost", tokenVerify, authPost.addPosts);

/**
 * @swagger
 * components:
 *   schemas:
 *     getProfileModel:
 *       type: object
 *       required:
 *         - post_id
 *       properties:
 *         post_id:
 *           type: string
 *           description: post_id
 *       example:
 *         post_id: "627c941368d45828aa944c92"
 *
 */

/**
 * @swagger
 * /getPost:
 *  post:
 *      summary: Used to get user information.
 *      tags:
 *          - User Post API's
 *      description: userProfile
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/getProfileModel'
 *      responses:
 *        200:
 *          description: Get data successfully.
 */

router.post("/getPost", tokenVerify, authPost.getPostDetails);

/**
 * @swagger
 * components:
 *   schemas:
 *     getProfileModel:
 *       type: object
 *       
 */

/**
 * @swagger
 * /getAllPost:
 *  get:
 *      summary: Used to get user information.
 *      tags:
 *          - User Post API's
 *      description: Get all Post Detail
 *      responses:
 *        200:
 *          description: Get data successfully.
 */

router.get("/getAllPost",tokenVerify,authPost.getAllPost);

/**
 * @swagger
 * components:
 *   schemas:
 *     likePostDataModel:
 *       type: object
 *       required:
 *         - post_id
 *       properties:
 *         post_id:
 *           type: string
 *           description: post_id
 *       example:
 *         post_id: "627c941368d45828aa944c92"
 *
 */

/**
 * @swagger
 * /likePost:
 *  post:
 *      summary: Used to like post on socail media.
 *      tags:
 *          - User Post API's
 *      description: user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/likePostDataModel'
 *      responses:
 *          200:
 *              description: Post liked.
 */

router.post("/likePost",tokenVerify,  authPost.postLikes);


/**
 * @swagger
 * components:
 *   schemas:
 *     disLikePostDataModel:
 *       type: object
 *       required:
 *         - post_id
 *       properties:
 *         post_id:
 *           type: string
 *           description: post_id
 *       example:
 *         post_id: "627c941368d45828aa944c92"
 *
 */

/**
 * @swagger
 * /disLikePost:
 *  post:
 *      summary: Used to like post on socail media.
 *      tags:
 *          - User Post API's
 *      description: user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/disLikePostDataModel'
 *      responses:
 *          200:
 *              description: Disliked Post.
 */
router.post("/disLikePost", tokenVerify, authPost.disLikePost);

/**
 * @swagger
 * components:
 *   schemas:
 *     commentPostDataModel:
 *       type: object
 *       properties:
 *         body:
 *           type: string
 *           description: body
 *         post_id:
 *           type: string
 *           description: body
 *       example:
 *         body: This is my 1st comment post on socail media.
 *         post_id: "627c941368d45828aa944c92"
 *
 */

/**
 * @swagger
 * /commentPost:
 *  post:
 *      summary: Used to comment post on socail media.
 *      tags:
 *          - User Post API's
 *      description: user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/commentPostDataModel'
 *      responses:
 *          200:
 *              description: Comment Posted.
 */

router.post("/commentPost", tokenVerify, authPost.commentPost);

/**
 * @swagger
 * components:
 *   schemas:
 *     madAboutMoviesDataModel:
 *       type: object
 *       required:
 *         - movieName
 *         - vedioUrl
 *         - category
 *         - token
 *       properties:
 *         movieName:
 *           type: string
 *           description: Title
 *         vedioUrl:
 *           type: string
 *           description: vedio Url
 *         category:
 *           type: string
 *           description: category name
 *         token:
 *           type: string
 *           description: access token
 *       example:
 *         "movieName": "Ham sath sath hai."
 *         "vedioUrl": "http://localhost:3009/file_1649397216117.png"
 *         "category": "Action"
 *
 */

/**
 * @swagger
 * /madAboutMovies:
 *  post:
 *      summary: Used to add movies on social media.
 *      tags:
 *          - Mad about movies API's
 *      description: user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/madAboutMoviesDataModel'
 *      responses:
 *          200:
 *              description: Post Uploaded..
 */

router.post("/madAboutMovies", tokenVerify, authMovies.madAboutMovies);

/**
 * @swagger
 * components:
 *   schemas:
 *     textReviewDataModel:
 *       type: object
 *       required:
 *         - like
 *         - dislike
 *         - comment
 *         - title
 *         - description
 *         - post_id
 *       properties:
 *         like:
 *           type: string
 *           description: like
 *         dislike:
 *           type: string
 *           description: dislike
 *         title:
 *           type: string
 *           description: title
 *         comment:
 *           type: string
 *           description: comment
 *         description:
 *           type: string
 *           description: description of post
 *       example:
 *         "post_id": "627a43e040d46c7ed815f56a"
 *         "like": 1
 *         "dislike": 2
 *         "title": "The enormous visuality of Atlantis!"
 *         "comment": "Hye nice post"
 *         "description": "The enormous visuality."       
 *
 */

/**
 * @swagger
 * /textReview:
 *  post:
 *      summary: Used to add post on social media.
 *      tags:
 *          - Mad about movies API's
 *      description: user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/textReviewDataModel'
 *      responses:
 *          200:
 *              description: Post Uploaded..
 */

//router.post("/textReview", tokenVerify, authMovies.textReview);

/**
 * @swagger
 * components:
 *   schemas:
 *     audioReviewDataModel:
 *       type: object
 *       required:
 *         - like
 *         - dislike
 *         - comment
 *         - title
 *         - audioUrl
 *         - post_id
 *       properties:
 *         like:
 *           type: string
 *           description: like
 *         dislike:
 *           type: string
 *           description: dislike
 *         title:
 *           type: string
 *           description: title
 *         comment:
 *           type: string
 *           description: comment
 *         audioUrl:
 *           type: string
 *           description: audioUrl
 *       example:
 *         "post_id": "627a43e040d46c7ed815f56a"
 *         "like": 1
 *         "dislike": 2
 *         "title": "The enormous visuality of Atlantis!"
 *         "comment": "Hye nice post"
 *         "description": "http://localhost:3009/file_1649397216117.png"       
 *
 */

/**
 * @swagger
 * /audioReview:
 *  post:
 *      summary: Used to add post on social media.
 *      tags:
 *          - Mad about movies API's
 *      description: user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/audioReviewDataModel'
 *      responses:
 *          200:
 *              description: Post Uploaded..
*/

//router.post("/audioReview", tokenVerify, authMovies.audioReview);

/**
 * @swagger
 * components:
 *   schemas:
 *     getDetailsDataModel:
 *       type: object
 *       required:
 *         - token
 *       properties:
 *         token:
 *           type: string
 *           description: token
 *       example:
 *         token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjQzZWU1MTQzN2ZhOTJmODIxM2NlOTQiLCJpYXQiOjE2NDg3MjAwMDYsImV4cCI6MTY0OTkyMDAwNn0.TWgASGsVWIq2qYYTqk9wa0xsIAsCVqWPD0v7qiXZ74k"
 *
 */

/**
 * @swagger
 * /getMoviesPostDetails:
 *  get:
 *      summary: Used to get user information.
 *      tags:
 *          - Mad about movies API's
 *      description: userProfile
 *      responses:
 *        200:
 *          description: Get data successfully.
 */

// router.get(
//   "/getMoviesPostDetails",
//   tokenVerify,
//   authMovies.getMoviesPostDetails
// );

export default router;
