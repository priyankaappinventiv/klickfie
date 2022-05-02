import auth from "../controllers/userController";
import express from "express";
import signUpValidate from "../validator/signUpvalidator";
import loginValidate from "../validator/loginValidator";
import tokenVerify from "../services/verifyToken";
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
 *         iamgeUrl: "http://localhost:3009/file_1649397216117.png"
 *
 */

/**
 * @swagger
 * /signUp:
 *  post:
 *      summary: Used to insert data in database
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

router.post("/signUp", signUpValidate, auth.signUp);

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

router.post("/login",loginValidate, auth.login);

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

router.post("/verifyOtp",auth.verifyOtp);

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
 *         iamgeurl: "http://localhost:3009/file_1649397216117.png"
 *
 */

/**
 * @swagger
 * /addPost:
 *  post:
 *      summary: Used to add post on social media.
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



router.post("/addPost",tokenVerify,auth.addPosts);

/**
 * @swagger
 * components:
 *   schemas:
 *     getProfileModel:
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
 * /getPost:
 *  get:
 *      summary: Used to get user information.
 *      description: userProfile
 *      responses:
 *        200:
 *          description: Get data successfully.
 */


router.get("/getPost",tokenVerify,auth.getPost);


/**
 * @swagger
 * components:
 *   schemas:
 *     likePostDataModel:
 *       type: object
 *       properties:
 *         likePost:
 *           type: Number
 *           description: likePost
 *       example:
 *         likePost: 1
 *
 */

/**
 * @swagger
 * /likePost:
 *  post:
 *      summary: Used to like post on socail media.
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



router.post("/likePost",tokenVerify,auth.postLikes);


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
 *       example:
 *         body: This is my 1st comment post on socail media.
 *
 */

/**
 * @swagger
 * /commentPost:
 *  post:
 *      summary: Used to comment post on socail media.
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


router.post("/commentPost",tokenVerify,auth.commentPost);

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

router.post("/socialMediaFb",auth.socialMediaFb);


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


router.post("/socialMediaGoogle",auth.socialMediaGoogle);


export default router;
