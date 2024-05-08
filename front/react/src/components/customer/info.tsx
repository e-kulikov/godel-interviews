import { type CustomerData } from "../../utils/customer-utils.ts"
import { CustomerTypes } from './types.tsx'
import { CustomerStats } from './stats.tsx'

export const CustomerInfo = ({
    name,
    picture,
    abilities,
    weight,
    height,
    stats,
    moves,
    types
}: CustomerData) => {
    return (
        <div className='customer-info'>
            <h2>{name.toUpperCase()}</h2>
            <CustomerTypes types={types} />
            <img className="picture" alt={name} src={picture} />
            <ul className="base-info">
                <li><strong>Weight:</strong> {weight}</li>
                <li><strong>Heoght:</strong> {height}</li>
                <li><strong>Abilities:</strong> {abilities.join(', ')}</li>
                <li><strong>Moves:</strong> {moves.join(', ')}</li>
            </ul>
            <CustomerStats stats={stats} />
        </div>
    )
}
