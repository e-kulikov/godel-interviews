import { useRef } from "react"

import clsx from "clsx"

import { useAPICall } from "../../hooks/use-api-call.ts"
import { type ModalHandlers } from "../../hooks/use-modal.ts"
import { parseCustomerData as parseResponse } from "../../utils/customer-utils.ts"

import { inModal } from "../../hocs/modal.tsx"

import { CustomerInfo } from './info.tsx'

import './card.styles.css'

interface PokemonCardProps {
  id: number
  className?: string
}

const CustomerInfoModal = inModal(CustomerInfo)

export const PokemonCard = ({ id, className }: PokemonCardProps) => {
  const modal = useRef<ModalHandlers>(null)
  const { loading, error, data } = useAPICall({
    path: `clients/${id}`,
    parseResponse,
  })

  const cardClassName = clsx('pokemon-card', className, { loading, error })

  if (loading) {
    return <div className={cardClassName}>Loading...</div>;
  }

  if (error) {
    return <div className={cardClassName}>Oops! {error.message}</div>;
  }

  if (!data) {
    return <div className={cardClassName}>Sorry, there is nothing here</div>;
  }

  return (
    <>
      <div className={cardClassName} onClick={modal.current?.open}>
        <p className="name">
          <strong>{data.name}</strong>
        </p>
        <img className="picture" src={data.picture} alt={data.name} />
        <p>
          Weight: <em>{data.weight}</em>
        </p>
        <p>
          Height: <em>{data.height}</em>
        </p>
        <p>
          Abilities: <em>{data.abilities.join(", ")}</em>
        </p>
      </div>
      <CustomerInfoModal {...data} ref={modal} />
    </>
  );
};
