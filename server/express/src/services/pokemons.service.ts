import { SOURCE_API_URL } from '../configs/sources.config.ts'
import { fetchJSON } from '../utils/fetch.ts'

interface Pokemon {
    id: number
    name: string
}

interface PokemonResponse extends Pick<Pokemon, 'name'> {
    url: string
}

interface PokemonsListResponse {
    count: number
    previous?: string
    next?: string
    results: PokemonResponse[]
}

const POKEMON_API_PATH = 'pokemon'

export const getPokemonsList = (query: { offset: number; limit: number }) => 
    fetchJSON<PokemonsListResponse>(
        new URL(`${POKEMON_API_PATH}?${new URLSearchParams(Object(query))}`, SOURCE_API_URL)
    )

interface PokemonDetails extends Pokemon {
    picture: string
}

interface PokemonDetailsResponse extends Pick<PokemonDetails, 'id' | 'name'> {}

export const getPokemon = (id: Pokemon['id']) =>
    fetchJSON<PokemonDetailsResponse>(
        new URL(`${POKEMON_API_PATH}/${id}`, SOURCE_API_URL)
    )
