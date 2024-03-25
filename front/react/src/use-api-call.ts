import { useState, useEffect } from "react";
import { API_URL } from "./settings.json";

interface UseAPICallProps<Data, ServerResponse> {
  path: string;
  parseResponse: (response: ServerResponse) => Data;
}

export const useAPICall = <Data, ServerResponse>({
  path,
  parseResponse,
}: UseAPICallProps<Data, ServerResponse>) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    setLoading(true);

    fetch(`${API_URL}/${path}`)
      .then((res) => res.json())
      .then(parseResponse)
      .then(setData)
      .catch(setError)
      .finally(() => {
        setLoading(false);
      });
  }, [path, parseResponse]);

  return { loading, error, data };
};
