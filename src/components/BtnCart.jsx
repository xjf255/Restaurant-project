import { useContext } from "react"
import { CartContext } from "../context/cart"
import { IconCart } from "./Icons"

export const BtnCart = ({ item, nombre }) => {
  const { addToCart } = useContext(CartContext)

  return (
    <button 
      className="cuantity__cart btn_addCart" 
      onClick={() => addToCart({ item, nombre })}
    >
      <IconCart />
      <strong>Add to cart</strong>
    </button>
  )
}