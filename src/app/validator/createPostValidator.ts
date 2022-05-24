import { check, validationResult } from "express-validator";
const addPostValidation = [
  check("title")
    .not()
    .isEmpty()
    .withMessage("title can not be empty!")
    .isString()
    .withMessage("title should be string")
    .isLength({ min: 1, max: 50 })
    .withMessage("Mininum should be 1 and maximum should be 50 characters required!"),
  check("imageUrl")
   .not()
   .isEmpty()
   .withMessage("Image can not be empty!")
   .isString()
   .withMessage("image should be URL."),
  (req: any, res: any, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];

export default addPostValidation;