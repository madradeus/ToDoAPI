import {Request, Response, Router} from 'express';

export const homeRouter  = Router();

homeRouter.all('/', (req: Request, res: Response): void => {
    res.redirect('/todo');

});

