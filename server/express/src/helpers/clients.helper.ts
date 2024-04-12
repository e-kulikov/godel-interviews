import { parser } from 'stream-json';
import { pick } from 'stream-json/filters/Pick'

export const pokemonURLtoClientID = parser().pipe(pick({ filter: 'name' }))