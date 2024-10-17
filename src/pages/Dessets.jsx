import { Main } from "../components/Main"
import { CartProvider } from "../context/cart"

export default function Dessets() {
  return (
    <CartProvider>
      <Main />
    </CartProvider>
  )
}