import { type CustomerData } from "./customer-utils"

const Stats = ({ stats }: { stats: CustomerData['stats'] }) => (
    <ul className="stats">
        {stats.map(({ name, value }) => <li key={name}><strong>{name}:</strong> {value}</li>)}
    </ul>
)

const Types = ({ types }: { types: CustomerData['types'] }) => (
    <ul className="types">
        {types.map((type) => <li key={type}>{type}</li>)}
    </ul>
)

export const CustomerInfo = ({
    opened,
    name,
    picture,
    abilities,
    weight,
    height,
    stats,
    moves,
    types
}: CustomerData & { opened: boolean }) => {
    if (!opened) return null;
    
    return (
        <div className="customer-info">
            <h2>{name.toUpperCase()}</h2>
            <Types types={types} />
            <img className="picture" alt={name} src={picture} />
            <ul className="base">
                <li><strong>Weight:</strong> {weight}</li>
                <li><strong>Heoght:</strong> {height}</li>
                <li><strong>Abilities:</strong> {abilities.join(', ')}</li>
                <li><strong>Moves:</strong> {moves.join(', ')}</li>
            </ul>
            <Stats stats={stats} />
        </div>
    )
}