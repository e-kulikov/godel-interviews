import { useState } from "react";

import { CustomerCard } from "./customer/card.tsx";
import { PageSize } from "./controls/page-size.tsx";
import { Pagination } from "./controls/pagination.tsx";

import { parseCustomersList as parseResponse } from "../utils/customer-utils.ts";
import { useAPICall } from "../hooks/use-api-call.ts";

import { PAGE_SIZE } from "../settings.json";

export const Dashboard = () => {
  const [pageSize, setPageSize] = useState(PAGE_SIZE.default);
  const [pageNumber, setPageNumber] = useState(0);
  const { data, loading, error } = useAPICall({
    path: `clients?limit=${pageSize}&offset=${pageSize * pageNumber}`,
    parseResponse,
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!Array.isArray(data)) {
    return <div>Sorry, there is nothing here</div>;
  }

  return (
    <div>
      <PageSize size={pageSize} onSetSize={setPageSize} />
      <div className="customer-list">
        {data.map((customer) => (
          <CustomerCard key={customer.id} id={customer.id} />
        ))}
      </div>
      <Pagination pageNumber={pageNumber} onSetPage={setPageNumber} />
    </div>
  );
};
