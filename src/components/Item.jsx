import { BtnCart } from "./BtnCart"
import { Toogle } from "./Toogle"


export const Item = ({ element, addToCart, removeToCart, cart }) => {
  const { name, image, category, price } = element 
  return (
    <li key={name} className="food">
      <figure>
        <img src={image.desktop} alt={name} />
        {
          !cart.includes(name)
            ? <BtnCart addToCart={addToCart} name={name} />
            : <Toogle addToCart={addToCart} removeToCart={removeToCart} cart={cart} name={name} />
        }
      </figure>
      <span className='food__category'>{category}</span>
      <h3 className="food__name">{name}</h3>
      <span className='food__price'>${price}</span>
    </li>
  )
}