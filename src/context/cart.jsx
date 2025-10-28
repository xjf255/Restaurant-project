import { createContext, useState } from "react";

export const CartContext = createContext({
  cart: [],
  removeToCart: ({ item, numItems }) => { item, numItems },
  addToCart: ({ item, nombre }) => { item, nombre }
})

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState([])

  const removeToCart = ({ item, numItems }) => {
    let NUM_DELETE_ITEM = numItems ?? -1
    const newCart = cart.filter(el => {
      if (el === item && NUM_DELETE_ITEM !== 0) {
        NUM_DELETE_ITEM--
        return
      }
      return el
    });
    setCart([...newCart])
    localStorage.setItem("cart", [...newCart])
  }

  const addToCart = ({ item, nombre }) => {
    if (item && !Array.isArray(item)) {
      const newCart = [...cart, item]
      setCart(newCart)
      localStorage.setItem("cart", newCart)
    } else if (Array.isArray(item)) {
      setCart((prevState) => prevState.concat(item))
    }
  }

  return (
    <CartContext.Provider value={
      {
        cart,
        addToCart,
        removeToCart
      }
    }>
      {children}
    </CartContext.Provider>
  )
}