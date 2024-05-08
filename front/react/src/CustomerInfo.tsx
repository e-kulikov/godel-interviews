import clsx from "clsx"

import { type CustomerData } from "./customer-utils"
import { CustomerTypes } from './components/CustomerTypes.tsx'
import { CustomerStats } from './components/CustomerStats.tsx'
import { useOutsideClick } from "./hooks/use-outside-click.ts"

export const CustomerInfo = ({
    name,
    picture,
    abilities,
    weight,
    height,
    stats,
    moves,
    types,
    className,
    onClose
}: CustomerData & { onClose: () => void, className?: string }) => {
    const ref = useOutsideClick<HTMLDivElement>(onClose)

    return (
        <div ref={ref} className={clsx('customer-info', className)}>
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
