import { Request, Response, NextFunction } from "express";

interface RequestWithTime extends Request {
    timeCall?: Date;
}

const loggerRequest = (req: RequestWithTime, _res: Response, next: NextFunction): void => {
    req.timeCall = new Date();
    console.log('TimeCall: ', req.timeCall);
    console.log('Method: ', req.method);
    console.log('Path: ', req.url);
    console.log('Body: ', req.body);
    console.log('---');
    next();
};

const errorHandler = (err: unknown, _req: Request, res: Response, next: NextFunction) => {
   
 
        if (err instanceof Error) {
           
            let errorMessage = 'Something went wrong. ';
            if (err instanceof Error) {
                errorMessage += 'Error: ' + err.message;
            }
            res.status(400).send(errorMessage);
    }
    next(err);
};
const unknowEndpoint = (_req: Request, res: Response) => {
    res.status(404).send({error: 'unknown endpoint'});
};

export default { loggerRequest, errorHandler, unknowEndpoint};