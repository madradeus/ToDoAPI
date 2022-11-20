import {NextFunction, Request, Response} from "express";

export class NotFoundError extends Error {}
export class ValidationError extends Error {}


export function handleError (err: NodeJS.ErrnoException,req: Request, res: Response, next: NextFunction) {

    if (err instanceof NotFoundError) {
        res.json({
            errorMessage: 'The todo item doesn\'t exist.Check given todo ID'
        })
    } else if (err instanceof ValidationError) {
        res.json({
            errorMessage: err.message
        })
    } else if (err.code === 'ER_DUP_ENTRY') {
        res.json({
            errorMessage: 'Given ID is already used',
        })
    } else {
        res.json({
            errorMessage: 'Unidentified error'
        })


    }
}

