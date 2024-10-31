import { Request, Response, NextFunction } from "express";
import { authenticate } from "../middlewares/auth-middleware";

export const login = (req: Request, res: Response, next: NextFunction): void => {
  authenticate(req, res);
};
