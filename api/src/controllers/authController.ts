import { Request, Response, NextFunction } from 'express';

export const login = (req: Request, res: Response, next: NextFunction): Response => {

  return res.status(200).json({ message: "Login successful!" });
};
