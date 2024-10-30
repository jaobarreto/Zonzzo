import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

interface TokenPayload {
  id: string;
  email: string;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  try {

    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      throw new Error("JWT_SECRET não está definido no arquivo .env");
    }

    const decoded = jwt.verify(token, secretKey) as TokenPayload;

    req.headers["user-id"] = decoded.id;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};
