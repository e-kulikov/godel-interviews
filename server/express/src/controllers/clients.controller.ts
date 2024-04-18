import { type RequestHandler } from 'express'

import { getPokemon, getPokemonsList } from '../services/pokemons.service.ts'
import { translateURLtoID, capitalizeName } from '../helpers/pokemons.helper.ts'
import { pipe } from '../utils/pipe.ts'

export const getAllClients: RequestHandler<{}, {}, {}, { offset: number; limit: number }> = async (req, res, next) => {
    try {
        const { offset, limit } = req.query

        const { results } = await getPokemonsList({ offset, limit })

        res.json({ clients: results.map(pipe(translateURLtoID, capitalizeName)) })
    } catch (err) {
        next(err)
    }
}

export const getClientById: RequestHandler<{ id: number }> = async (req, res, next) => {
    try {
        res.json({ client: await getPokemon(req.params.id) })
    } catch (err) {
        next(err)
    }
}
