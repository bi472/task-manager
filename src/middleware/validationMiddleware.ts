import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

export const validationMiddleware = (type: any): any => {
    return (req: Request, res: Response, next: NextFunction) => {
        const dto = plainToInstance(type, req.body);

        validate(dto).then((errors: ValidationError[]) => {
            if (errors.length > 0) {
                const messages = errors.map((error: ValidationError) =>
                    Object.values(error.constraints || {}).join(', ')
                ).join(', ');
                res.status(400).json({ error: messages });
            } else {
                next();
            }
        });
    };
};
