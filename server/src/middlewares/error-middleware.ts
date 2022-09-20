import ApiError from "../exception/api-error";
import {NextFunction, Response} from "express";

export default function (err: Error, req: Request, res: Response, next: NextFunction): Response {
    console.log(err);
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message, errors: err.errors});
    }
    return res.status(500).json({message: "Unexpected error"})
}