import { type RequestHandler } from 'express'

import { proxyPictureRequest } from '../services/assets.service.ts'

export const getPicture: RequestHandler<{ picture: string }> = async (req, res, next) => {
    try {
        (await proxyPictureRequest(req)).pipe(res)
    } catch (err) {
        next(err)
    }
}