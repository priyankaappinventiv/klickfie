import jwt from "jsonwebtoken";
import {Request, Response} from "express";

interface jwtVerify{ 
  id: string,
  iat: Number,
  exp:Number,
}

const key: string = String(process.env.JWTSECRET);

const decodeJwtToken = async (req: Request, res: Response) => {
  const token = req.headers["authorization"];
  const data= jwt.verify(`${token}`, key) as unknown as jwtVerify;
  console.log(data);
  
  return data;
};

export default decodeJwtToken;
