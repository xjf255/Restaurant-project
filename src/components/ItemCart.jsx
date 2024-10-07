import { useContext } from "react"
import { CartContext } from "../context/cart"
import { IconRemove } from "./Icons"

export function ItemCart({ element }) {
  const { name, price } = element
  const { cart, removeToCart } = useContext(CartContext)
  const cuantity = cart.filter(el => el === name).length

  const handleRemove = () => removeToCart({ item: name })


  return (
    <div className='cart--items'>
      <div>
        <h3>{name}</h3>
        <span className='item__info'>
          <p className="cuantity">{cuantity}x</p>
          <p className="unit__price">@${price}</p>
          <p className="total__price">${price * cuantity}</p>
        </span>
      </div>
      <i onClick={handleRemove} ><IconRemove /></i>
    </ div>
  )
}