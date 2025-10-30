import { useContext, useEffect } from "react";
import { CartContext } from "../context/cart";
import { Empty } from "./Empty";
import { ListCart } from "./ListCart";

export function Cart({category}) {

  const { cart, addToCart } = useContext(CartContext)

  useEffect(() => {
    const localCart = localStorage.getItem("cart")

    if (localCart != null && localCart.trim() !== '' && cart.length === 0) {
      const newCart = localCart.split(',')
      addToCart({ item: newCart })
    }
  }, [])


  return (
    <aside>
      <h2>Tu carrito ({cart.length})</h2>
      {
        cart.length === 0
          ? <Empty />
          : <ListCart />
      }
    </aside>
  )
}