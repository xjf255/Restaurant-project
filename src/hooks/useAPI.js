import { useQuery } from "@tanstack/react-query"

export default function useFetchAPI({ api, key }) {
  const fetchData = async () => {
    const data = await fetch(api)
    if (!data.ok) {
      throw new Error('Error en la obtencion de datos')
    }
    return data.json()
  }

  const { isLoading, data, isError, isFetching } = useQuery({
    queryKey: ["API", key, api],
    queryFn: fetchData,
    keepPreviousData: false,
    staleTime: 0
  })

  return { isLoading, data, isError, isFetching }
}