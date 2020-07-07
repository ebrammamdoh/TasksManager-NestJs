import { NextFunction } from "express";


export function logger(req: Request, res: Response, next: Function) {
    //logging
    next();
}