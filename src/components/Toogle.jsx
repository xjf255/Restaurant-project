import { useContext } from "react"
import { CartContext } from "../context/cart"
import { IconDecrementCuantity, IconIncrementCuantity } from "./Icons"

export const Toogle = ({ item, nombre }) => {

  const { addToCart, removeToCart, cart } = useContext(CartContext)

  return (
    <div className="toogle cuantity__cart">
      <i className="toogle__cuantity--plus" onClick={() => { removeToCart({numItems:1,item}) }}>
        <IconDecrementCuantity />
      </i>
      <span className="toogle__cuantity">
        {cart.filter(ele => ele === name).length}
      </span>
      <i className="toogle__cuantity--less" onClick={() => { addToCart({item, nombre}) }}>
        <IconIncrementCuantity />
      </i>
    </div>
  )
}