import { useContext } from "react";
import { CartContext } from "../context/cart";
import { Empty } from "./Empty";
import { ListCart } from "./ListCart";

export function Cart({ data }) {

  const { cart } = useContext(CartContext)

  return (
    <aside>
      <h2>Your Cart ({cart.length})</h2>
      {
        cart.length === 0
          ? <Empty />
          : <ListCart data={data} />
      }
    </aside>
  )
}