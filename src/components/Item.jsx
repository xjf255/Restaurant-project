import { useContext } from "react"
import { BtnCart } from "./BtnCart"
import { Toogle } from "./Toogle"
import { CartContext } from "../context/cart"


export const Item = ({ element }) => {

  const { cart } = useContext(CartContext)
  const { name, image, category, price } = element
  return (
    <li key={name} className="food">
      <figure>
        <img src={image.desktop} alt={name} />
        {
          !cart.includes(name)
            ? <BtnCart name={name} />
            : <Toogle name={name} />
        }
      </figure>
      <span className='food__category'>{category}</span>
      <h3 className="food__name">{name}</h3>
      <span className='food__price'>${price}</span>
    </li>
  )
}