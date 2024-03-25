import { useMemo, useState } from "react";

import { CustomerCard } from "./CustomerCard.tsx";
import { PageSize } from "./PageSize.tsx";
import { Pagination } from "./Pagination.tsx";

import { parseCustomersList as parseResponse } from "./customer-utils.ts";
import { useAPICall} from "./use-api-call.ts";

import { PAGE_SIZE } from "./settings.json";

export const Dashboard = () => {
    const [pageSize, setPageSize] = useState(PAGE_SIZE.default);
    const [pageNumber, setPageNumber] = useState(0);
    const path = useMemo(
        () => `pokemon?limit=${pageSize}&offset=${pageSize * pageNumber}`,
        [pageSize, pageNumber]
    );
    const { data, loading, error } = useAPICall({
        path,
        parseResponse
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!Array.isArray(data)) {
        return <div>Sorry, there is nothing here</div>
    }

    return (
        <div>
            <p style={{ background: "red" }}>{import.meta.env.FRONT_API_URL}</p>
            <PageSize size={pageSize} onSetSize={setPageSize} />
            <div className="customer-list">
                {data.map((customer) => (
                    <CustomerCard name={customer.name} />
                ))}
            </div>
            <Pagination pageNumber={pageNumber} onSetPage={setPageNumber} />
        </div>
    );
};
