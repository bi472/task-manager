import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

const formatErrors = (errors: ValidationError[]) => {
    return errors.map(error => {
        return {
            property: error.property,
            constraints: Object.values(error.constraints || {})
        };
    });
};

export const validationMiddleware = (type: any): any => {
    return (req: Request, res: Response, next: NextFunction) => {
        const dto = plainToInstance(type, req.body);

        validate(dto).then((errors: ValidationError[]) => {
            if (errors.length > 0) {
                const formattedErrors = formatErrors(errors);
                res.status(400).json({ errors: formattedErrors });
            } else {
                next();
            }
        });
    };
};
