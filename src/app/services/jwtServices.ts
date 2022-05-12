import jwt, { JwtPayload } from "jsonwebtoken";
import { responses } from "../helper/response";
const key: string = String(process.env.JWTSECRET);

export function generateToken(_id:Object): Promise<string> {
  try {
      const token: string | JwtPayload = jwt.sign({ _id}, key, { expiresIn: "1d" })
      return Promise.resolve(token);
  }
  catch (err: any) {
      return Promise.reject(responses.status);
  }
}

// export function verifyToken(req: Request, res: Response, next: NextFunction): void {
//   try {
//       const header = <String>CONFIG.HEADERS
//       const token: string | string[] | undefined = req.headers[`${header}`];
//       if (!token) {
//           res.status(401).json("token not found")
//       }
//       else {
//           const jwtSecret = String(CONFIG.JWT_SECRET);
//           const userVerification: string | JwtPayload = jwt.verify(`${req.headers[`${header}`]}`, jwtSecret);
//               req.body.tokenId = userVerification;
//               next();
//       }
//   }
//   catch(err : any){
//       res.json(STATUS_MSG.ERROR.BAD_REQUEST.message)
//   }
// }




