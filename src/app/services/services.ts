import jwt from "jsonwebtoken";
const key: string = String(process.env.JWTSECRET);

const jwtSign = (_id: Object) => {
  return jwt.sign({ _id }, key, { expiresIn: 2 * 24 * 60 * 1000 });
};
export default jwtSign;
