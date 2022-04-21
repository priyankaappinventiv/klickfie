import jwt from "jsonwebtoken";
import { JWTEXP} from "../constant/constant";
const key: string = String(process.env.JWTSECRET);

const jwtSign= (_id: Object) => {
  return (jwt.sign({ _id }, key, { expiresIn: JWTEXP.exp }));
};

export default jwtSign;
