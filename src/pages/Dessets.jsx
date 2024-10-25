import { Main } from "../components/Main"
import { CartProvider } from "../context/cart"
import useFetchAPI from "../hooks/useAPI"

export default function Dessets() {

  const COUPON_URL = import.meta.env.VITE_COUPON_URL

  const { isError } = useFetchAPI({ api: COUPON_URL, key: "coupon" })
  return (
    <CartProvider>
      <Main />
    </CartProvider>
  )
}