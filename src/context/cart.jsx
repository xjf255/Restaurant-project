import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  getCartTotal: () => 0
})

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [cart]);

  const addToCart = ({ item, nombre, quantity = 1 }) => {
    if (!item) return;

    if (Array.isArray(item)) {
      setCart(prevCart => [...prevCart, ...item]);
    } else {
      const itemsToAdd = Array(quantity).fill({ id: item, nombre });
      setCart(prevCart => [...prevCart, ...itemsToAdd]);
    }
  }

  const removeFromCart = ({ item, quantity }) => {
    if (!item) return;

    setCart(prevCart => {
      let itemsToRemove = quantity ?? 1;
      
      return prevCart.filter(cartItem => {
        if (cartItem.id === item && itemsToRemove > 0) {
          itemsToRemove--;
          return false;
        }
        return true; 
      });
    });
  }

  const clearCart = () => {
    setCart([]);
  }

  const getCartTotal = () => {
    return cart.length;
  }

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      getCartTotal
    }}>
      {children}
    </CartContext.Provider>
  )
}