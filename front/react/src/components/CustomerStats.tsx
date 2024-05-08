import { type CustomerData } from '../customer-utils.ts'

export const CustomerStats = ({ stats }: { stats: CustomerData['stats'] }) => (
    <ul className="stats">
        {stats.map(({ name, value }) => <li key={name}><strong>{name}:</strong> {value}</li>)}
    </ul>
)
