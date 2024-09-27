import { BtnCart } from "./BtnCart"
import { Toogle } from "./Toogle"


export const Item = ({ element, addToCart, removeToCart, cart }) => {
  const { name, image, category, price } = element 
  return (
    <li key={name}>
      <figure>
        <img src={image.desktop} alt={name} />
        {
          !cart.includes(name)
            ? <BtnCart addToCart={addToCart} name={name} />
            : <Toogle addToCart={addToCart} removeToCart={removeToCart} cart={cart} name={name} />
        }
      </figure>
      <span className='category'>{category}</span>
      <h3>{name}</h3>
      <span className='price'>${price}</span>
    </li>
  )
}