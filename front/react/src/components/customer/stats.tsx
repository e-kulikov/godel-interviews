import { type CustomerData } from '../../utils/customer-utils.ts'

interface CustomerStatsProps extends Pick<CustomerData, 'stats'> {}

export const CustomerStats = ({ stats }: CustomerStatsProps) => (
    <ul className="stats">
        {stats.map(({ name, value }) => <li key={name}><strong>{name}:</strong> {value}</li>)}
    </ul>
)
