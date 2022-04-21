import { check, validationResult } from "express-validator";
const signUpValidate = [
  check("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("name can not be empty!")
    .isAlpha()
    .withMessage("Name should be alpha case.")
    .isLength({ min: 3, max: 15 })
    .withMessage("Minimum 3 characters required!"),
  check("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email can not be empty.")
    .isEmail()
    .withMessage("Invalid email address!"),
  check("phoneNumber")
    .not()
    .isEmpty()
    .withMessage("PhoneNumber can not be empty!")
    .isNumeric()
    .withMessage("Phone number should be numeric.")
    .isLength({ min: 12, max: 12 })
    .withMessage("Minimum 10 characters required!"),
  (req: any, res: any, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];

export default signUpValidate;
