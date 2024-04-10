import { ref, onMounted } from "vue"
import { API_URL } from "./settings.json"

interface UseAPICallProps<Data, ServerResponse> {
  path: string
  parseResponse: (response: ServerResponse) => Data
}

const useAPICall = <Data, ServerResponse>({
  path,
  parseResponse,
}: UseAPICallProps<Data, ServerResponse>) => {
  const data = ref<Data>()
  const error = ref<Error>()
  const loading = ref<boolean>(true)

  onMounted(() => {
    loading.value = true

    fetch(`${API_URL}/${path}`)
      .then((res) => res.json())
      .then(parseResponse)
      .then((parsedData) => (data.value = parsedData))
      .catch((err) => (error.value = err))
      .finally(() => (loading.value = false))
  })

  return { loading, error, data }
};

export default useAPICall
