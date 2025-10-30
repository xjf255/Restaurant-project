import { useContext } from "react"
import { CartContext } from "../context/cart"
import { IconCart } from "./Icons"

export const BtnCart = ({ item, category }) => {

  const { addToCart } = useContext(CartContext)

  return (
    <button 
      className="cuantity__cart btn_addCart" 
      onClick={() => addToCart({ item, category })}
    >
      <IconCart />
      <strong>Add to cart</strong>
    </button>
  )
}