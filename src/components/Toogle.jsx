import { useContext } from "react"
import { CartContext } from "../context/cart"
import { IconDecrementCuantity, IconIncrementCuantity } from "./Icons"

export const Toogle = ({ item, nombre }) => {
  const { addToCart, removeFromCart, cart } = useContext(CartContext)
  const itemCount = cart.filter(cartItem => cartItem.id === item).length

  return (
    <div className="toogle cuantity__cart">
      <i 
        className="toogle__cuantity--plus" 
        onClick={() => removeFromCart({ item, quantity: 1 })}
      >
        <IconDecrementCuantity />
      </i>
      <span className="toogle__cuantity">
        {itemCount}
      </span>
      <i 
        className="toogle__cuantity--less" 
        onClick={() => addToCart({ item, nombre })}
      >
        <IconIncrementCuantity />
      </i>
    </div>
  )
}