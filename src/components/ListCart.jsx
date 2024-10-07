import { useContext, useState, useEffect } from "react"
import { CartContext } from "../context/cart"
import { IconCarbonNeutral } from "./Icons"
import { ItemCart } from "./ItemCart"

export function ListCart({ data }) {

  const [pay, setPay] = useState(0)
  const { cart } = useContext(CartContext)

  useEffect(() => {
    setPay(0)
    data.map(el => {
      if (cart.includes(el.name)) {
        setPay(prevValue => prevValue + (el.price * cart.filter(ele => ele === el.name).length))
      }
    })
  }, [cart])

  return (
    <>
      {data.map(el => cart.includes(el.name) && <ItemCart key={el.name} element={el} />)}
      <span className='total__pay'>
        <p>Order Total</p>
        <p className="total">${pay}</p>
      </span>
      <p className="ads">
        <IconCarbonNeutral />
        This is a <strong>carbon-neutral</strong> delivery
      </p>
      <button className='btn--confirm'>Confirm order</button>
    </>
  )
}