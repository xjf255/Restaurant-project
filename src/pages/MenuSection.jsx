import { useContext, useEffect } from "react"
import { Main } from "../components/Main"
import { CartContext } from "../context/cart"
import useFetchAPI from "../hooks/useAPI"

export default function MenuSection() {
  const API_URL = import.meta.env.VITE_API_URL
  let path = window.location.pathname.toLowerCase()
  path = path.startsWith("/admin") ? path.slice(6) : path
  path = path === "/extras" ? "/complementos" : path

  console.log("Ruta actual:", path)

  const category = path.slice(1)
  const api = `${API_URL}${path}`
  const { isLoading, data, isError } = useFetchAPI({ api, key: category })
  const { upsertCatalog } = useContext(CartContext)

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      upsertCatalog(data)
    }
  }, [data])
  return (

    <>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Ha habido un error</p>}
      {data && data.length > 0 ? (
        <Main data={data} category={category} />
      ) : (
        <p>No hay elementos para mostrar.</p>
      )}
    </>
  )
}