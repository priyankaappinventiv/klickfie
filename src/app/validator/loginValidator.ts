import { check, validationResult } from "express-validator";
const loginValidate = [
  check("phoneNumber")
    .not()
    .isEmpty()
    .withMessage("PhoneNumber can not be empty!")
    .isString()
    .withMessage("Phone number should be numeric.")
    .isLength({ min: 12, max: 12 })
    .withMessage("Minimum 12 characters required!"),
  (req: any, res: any, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];

export default loginValidate;