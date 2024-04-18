import { type ErrorRequestHandler } from 'express'
import createHttpError from 'http-errors'
import { StatusCodes } from 'http-status-codes'

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    console.error(error);
    
    if (createHttpError.isHttpError(error)) {
        return res.status(error.statusCode).send(error.message);
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Looks like Team Rocket\'s blasting off again!'})
}
