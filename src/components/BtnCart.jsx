import { useContext } from "react"
import { CartContext } from "../context/cart"
import { IconCart } from "./Icons"


export const BtnCart = ({ name }) => {

  const { addToCart } = useContext(CartContext)

  return (
    <button className="cuantity__cart btn_addCart" onClick={() => { addToCart({ item: name }) }}>
      <IconCart />
      <strong>add to cart</strong>
    </button>
  )
}