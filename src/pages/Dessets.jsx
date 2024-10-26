import { Main } from "../components/Main"
import { CartProvider } from "../context/cart"
import useFetchAPI from "../hooks/useAPI"

export default function Dessets() {

  const COUPON_URL = import.meta.env.VITE_COUPON_URL
  const BILL_URL = import.meta.env.VITE_BILL_URL

  const { isError: errorCoupon } = useFetchAPI({ api: COUPON_URL, key: "coupon" })
  const { isError: errorBill } = useFetchAPI({ api: BILL_URL, key: "bill" })

  return (
    <CartProvider>
      <Main />
    </CartProvider>
  )
}