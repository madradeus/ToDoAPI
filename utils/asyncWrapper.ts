import {NextFunction, Request, Response} from "express";

export function runAsyncWrapper (callback: any) {
    return function (req: Request, res: Response, next: NextFunction) {
        callback(req, res, next)
            .catch(next)
    }
}

