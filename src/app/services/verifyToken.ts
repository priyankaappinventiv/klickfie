import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
const key: string = String(process.env.JWTSECRET);


const tokenVerify = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.send("A token is required for authentication");
  }
  try {
    req.body._id= jwt.verify(token, key);
    return next();
  } catch (err) {
    return res.json("Invalid Token");
  }
};

export default tokenVerify;
