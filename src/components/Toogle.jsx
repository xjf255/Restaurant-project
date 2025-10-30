import { useContext, useMemo } from "react"
import { CartContext } from "../context/cart"
import { IconDecrementCuantity, IconIncrementCuantity } from "./Icons"

export const Toogle = ({ item, category }) => {
  const { addToCart, removeFromCart, cart } = useContext(CartContext)
  const itemCount = useMemo(() => {
    return cart.filter((c) => c.id === item).length;
  }, [cart, item])

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
        onClick={() => addToCart({ item, category})}
      >
        <IconIncrementCuantity />
      </i>
    </div>
  )
}