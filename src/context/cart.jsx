import { createContext, useState } from "react";

export const CartContext = createContext({
  cart: [],
  removeToCart: ({ item, numItems }) => { item, numItems },
  addToCart: ({ item}) => { item }
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
    setCart([...newCart]);
  }

  const addToCart = ({ item }) => {
    setCart([...cart, item])
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