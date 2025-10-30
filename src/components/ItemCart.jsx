import { useContext, useMemo } from "react"
import { CartContext } from "../context/cart"
import { IconRemove } from "./Icons"

export function ItemCart({ element, itemId }) {
  const { nombre, descripcion, costo:price } = element
  const { cart, removeFromCart } = useContext(CartContext)
  const name = nombre ? nombre : descripcion

  const quantity = useMemo(() => {
    return cart.filter((c) => c.id === itemId).length;
  }, [cart, itemId])

  const handleRemove = () => {
    removeFromCart({ item: itemId })
  }

  return (
    <div className='cart--items'>
      <div>
        <h3>{name}</h3>
        <span className='item__info'>
          <p className="cuantity">{quantity}x</p>
          <p className="unit__price">@${price.toFixed(2)}</p>
          <p className="total__price">${(price * quantity).toFixed(2)}</p>
        </span>
      </div>
      <i onClick={handleRemove} style={{ cursor: 'pointer' }}>
        <IconRemove />
      </i>
    </div>
  )
}