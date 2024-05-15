import { type CustomerData } from '../../utils/customer-utils.ts'

interface CustomerTypesProps extends Pick<CustomerData, 'types'> {}

export const CustomerTypes = ({ types }: CustomerTypesProps) => (
    <ul className="customer-types">
        {types.map((type) => <li className="customer-type" key={type}>{type}</li>)}
    </ul>
)
