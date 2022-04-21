import auth from "../controllers/user/controller";
import express from "express";
import upload from "../controllers/user/imageUpload";
import signUpValidate from "../validator/signUpvalidator";
import loginValidate from "../validator/loginValidator";
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     signupDataModel:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - phoneNumber
 *         - image
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
 *         image:
 *           type: file
 *           key: image
 *           description: image Url
 *       example:
 *         name: priyankapatel
 *         email: priyankapatel@gmail.com
 *         phoneNumber: 9170802978
 *         iamgeurl: "http://localhost:3009/file_1649397216117.png"
 *
 */

/**
 * @swagger
 * /signup:
 *  post:
 *      summary: Used to insert data in database
 *      description: user
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#components/schemas/signupDataModel'
 *      responses:
 *          200:
 *              description: Data inserted.
 */

router.post("/signup", upload, signUpValidate, auth.signUp);

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
 *         phoneNumber: "919170802978"
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
 *         phoneNumber: "919170802978"
 *         code: "9212"
 *
 */

/**
 * @swagger
 * /verifyotp:
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

router.post("/verifyotp",auth.verifyOtp);

export default router;
