import { Item } from "../components/Item"
import { Main } from "../components/Main"
import { CartProvider } from "../context/cart"
import useFetchAPI from "../hooks/useAPI"

export default function Dessets() {

  const API_URL = import.meta.env.VITE_API_URL
  let path = window.location.pathname.toLocaleLowerCase()

  path = path === "/extras" ? "/complementos" : path

  const { isLoading, data, isError: errorCoupon } = useFetchAPI({ api: API_URL + path, key: path.replace('/', '') })

  console.log({ errorCoupon, data })

  return (
    <CartProvider>
      {isLoading && <p>Loading...</p>}
      {errorCoupon && <p>Ha habido un error</p>}
      {data && data.length > 0 ? (
        <Main data={data} />
      ) : (
        <p>No hay elementos para mostrar.</p>
      )}
    </CartProvider>
  )
}