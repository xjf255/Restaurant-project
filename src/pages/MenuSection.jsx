import { useContext, useEffect } from "react"
import { Main } from "../components/Main"
import { CartContext, CartProvider } from "../context/cart"
import useFetchAPI from "../hooks/useAPI"

export default function MenuSection() {
  const API_URL = import.meta.env.VITE_API_URL
  let path = window.location.pathname.toLowerCase()
  path = path === "/extras" ? "/complementos" : path

  const category = path.slice(1)
  const api = `${API_URL}${path}`
  const { isLoading, data, isError } = useFetchAPI({ api, key: category })
  const { upsertCatalog } = useContext(CartContext)

  useEffect(() => {
    if (data.length > 0) {
      upsertCatalog(data)
    }
  }, [data])
  return (

    <>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Ha habido un error</p>}
      {data && data.length > 0 ? (
        <Main data={data} />
      ) : (
        <p>No hay elementos para mostrar.</p>
      )}
    </>
  )
}