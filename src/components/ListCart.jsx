import { useContext, useState, useEffect, useMemo } from "react"
import { CartContext } from "../context/cart"
import { IconCarbonNeutral } from "./Icons"
import { ItemCart } from "./ItemCart"
import { ModalBuy } from "./ModalBuy"

export function ListCart({ data }) {
  const { cart } = useContext(CartContext)
  const [statePay, setStatePay] = useState(false)

  const totalPay = useMemo(() => {
    return cart.reduce((total, cartItem) => {
      const product = data.find(el => el.name === cartItem.nombre)
      return product ? total + product.price : total
    }, 0)
  }, [cart, data])

  const uniqueCartItems = useMemo(() => {
    const itemsMap = new Map()
    cart.forEach(cartItem => {
      const key = cartItem.id
      if (!itemsMap.has(key)) {
        itemsMap.set(key, cartItem)
      }
    })
    return Array.from(itemsMap.values())
  }, [cart])

  const handleClick = (e) => {
    if (
      e.target.matches("dialog.shadow") || 
      e.target.matches("svg") || 
      e.target.matches("path")
    ) {
      setStatePay(false)
    }
  }

  return (
    <>
      {uniqueCartItems.map(cartItem => {
        const element = data.find(el => el.name === cartItem.nombre)
        return element ? (
          <ItemCart key={cartItem.id} element={element} itemId={cartItem.id} />
        ) : null
      })}
      
      <span className='total__pay'>
        <p>Order Total</p>
        <p className="total">${totalPay.toFixed(2)}</p>
      </span>
      
      <button 
        className='btn--confirm' 
        onClick={() => setStatePay(true)}
        disabled={cart.length === 0}
      >
        Confirm order
      </button>
      
      {statePay && <ModalBuy handleClick={handleClick} pay={totalPay} />}
    </>
  )
}