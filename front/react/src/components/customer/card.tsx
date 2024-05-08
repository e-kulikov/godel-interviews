import { useRef } from "react";

import { useAPICall } from "../../hooks/use-api-call.ts";
import { type ModalHandlers } from "../../hooks/use-modal.ts";
import { parseCustomerData as parseResponse } from "../../utils/customer-utils.ts";

import { inModal } from "../../hocs/modal.tsx";

import { CustomerInfo } from './info.tsx';

interface CustomerProps {
  id: number;
}

const CustomerInfoModal = inModal(CustomerInfo)

const noop = () => {}

export const CustomerCard = ({ id }: CustomerProps) => {
  const modal = useRef<ModalHandlers>(null)
  const { loading, error, data } = useAPICall({
    path: `clients/${id}`,
    parseResponse,
  })

  const showInfo = modal.current?.open ?? noop

  if (loading) {
    return <div className="customer">Loading...</div>;
  }

  if (error) {
    return <div className="customer">Oops! {error.message}</div>;
  }

  if (!data) {
    return <div className="customer">Sorry, there is nothing here</div>;
  }

  return (
    <div className="customer">
      <p className="name" onClick={showInfo}>
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
      <CustomerInfoModal {...data} ref={modal} />
    </div>
  );
};
