import { type RequestHandler } from 'express'

import { SOURCE_API_URL } from '../config.ts'
import { proxy } from '../utils/proxy.ts'
import { pokemonURLtoClientID } from '../helpers/clients.helper.ts'

const EXTERNAL_API_PATH = 'pokemon'

export const getAllClients: RequestHandler = (req, res) => proxy(
    new URL(`${EXTERNAL_API_PATH}?limit=100000`, SOURCE_API_URL),
    req,
    res,
    {},
    pokemonURLtoClientID
)

export const getClientById: RequestHandler = (req, res) => {

}