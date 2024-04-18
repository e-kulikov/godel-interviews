import { Readable } from 'node:stream';

import { type Request as ExpressRequest } from 'express'
import createHttpError from 'http-errors';
import { StatusCodes } from 'http-status-codes';

import { proxy } from '../utils/proxy.ts'

const POKEMON_ASSETS_BASE = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'

export const proxyPictureRequest = async (req: ExpressRequest) => {
    const pic = await proxy(new URL(req.params.picture, POKEMON_ASSETS_BASE), req);

    if (!pic.ok) throw createHttpError(pic.status, pic.statusText)
    if (!pic.body) throw createHttpError(StatusCodes.NOT_FOUND)
    
    return Readable.fromWeb(pic.body)
}
