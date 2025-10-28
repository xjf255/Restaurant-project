import { useContext, useState, useEffect } from "react"
import { CartContext } from "../context/cart"
import { IconCarbonNeutral } from "./Icons"
import { ItemCart } from "./ItemCart"
import { ModalBuy } from "./ModalBuy"


export function ListCart({ data }) {

  const [pay, setPay] = useState(0)
  const { cart } = useContext(CartContext)
  const [statePay, setStatePay] = useState(false)

  console.log({ cart })

  useEffect(() => {
    setPay(0)
    data.map(el => {
      if (cart.includes(el.name)) {
        setPay(prevValue => prevValue + (el.price * cart.filter(ele => ele === el.name).length))
      }
    })
  }, [cart])

  const handleClick = (e) => {
    if (e.target.matches("dialog.shadow") || e.target.matches("svg") || e.target.matches("path")) {
      setStatePay(false)
    }
  }

  return (
    <>
      {data.map(el => cart.includes(el.name) && <ItemCart key={el.name} element={el} />)}
      <span className='total__pay'>
        <p>Order Total</p>
        <p className="total">${pay}</p>
      </span>
      <p className="ads">
        <IconCarbonNeutral />
      </p>
      <button className='btn--confirm' onClick={() => setStatePay(true)}>Confirm order</button>
      {statePay && <ModalBuy handleClick={handleClick} pay ={pay}/>}
    </>
  )
}