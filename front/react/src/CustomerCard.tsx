import { useAPICall } from "./use-api-call.ts";
import { parseCustomerData as parseResponse } from "./customer-utils.ts";
import { CustomerInfo } from './CustomerInfo.tsx';
import { useState } from "react";

interface CustomerProps {
  id: number;
}

export const CustomerCard = ({ id }: CustomerProps) => {
  const [showInfo, setShowInfo] = useState(false);
  const { loading, error, data } = useAPICall({
    path: `clients/${id}`,
    parseResponse,
  });

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
      <p className="name" onClick={() => setShowInfo(state => !state)}>
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
      <CustomerInfo {...data} opened={showInfo} />
    </div>
  );
};
