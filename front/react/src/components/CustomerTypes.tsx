import { type CustomerData } from '../customer-utils.ts'

export const CustomerTypes = ({ types }: { types: CustomerData['types'] }) => (
    <ul className="customer-types">
        {types.map((type) => <li className="customer-type" key={type}>{type}</li>)}
    </ul>
)
