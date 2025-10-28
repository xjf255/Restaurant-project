import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
  cart: [],
  catalog: {},
  upsertCatalog: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  getCartTotal: () => 0,
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("cart") || "[]");
      return Array.isArray(saved) ? saved.map(x => (typeof x === "string" ? x : x?.id)).filter(Boolean) : [];
    } catch { return []; }
  });

  const [catalog, setCatalog] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("catalogIndex") || "{}");
      return saved && typeof saved === "object" ? saved : {};
    } catch { return {}; }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("catalogIndex", JSON.stringify(catalog));
  }, [catalog]);

  // === misma lógica de Item para construir la key ===
  const getItemKey = (el) => {
    if (!el) return "";
    const {
      nombre = "Sin nombre",
      cantidad = "0",
      descripcion = "Sin descripción",
      numPromocion,
      numCombo,
    } = el;
    const displayName =
      nombre === "Sin nombre" && cantidad === "0"
        ? descripcion
        : (cantidad !== "0" ? `${nombre} ${cantidad}` : nombre);
    return (numPromocion || numCombo || displayName.trim().toLowerCase()) ?? "";
  };

  const upsertCatalog = useCallback((items = []) => {
    if (!Array.isArray(items) || items.length === 0) return;

    setCatalog(prev => {
      let changed = false;
      const next = { ...prev };

      for (const el of items) {
        const key = getItemKey(el);
        if (!key) continue;

        const raw = el.costo;
        const costo = typeof raw === "number" ? raw : Number(String(raw).replace(/[^0-9.]/g, "")) || 0;
        const nuevo = {
          key,
          nombre: el.nombre ?? el.descripcion ?? key,
          costo,
          img: el.img ?? "/placeholder.jpg",
        };

        const viejo = prev[key];
        if (!viejo ||
            viejo.costo !== nuevo.costo ||
            viejo.nombre !== nuevo.nombre ||
            viejo.img !== nuevo.img) {
          next[key] = nuevo;
          changed = true;
        }
      }
      return changed ? next : prev;
    });
  }, []);

  const addToCart = ({ item, quantity = 1 }) => {
    if (!item || typeof item !== "string") return;
    const qty = Math.max(1, Number(quantity) || 1);
    setCart(prev => [...prev, ...Array(qty).fill(item)]);
  };

  const removeFromCart = ({ item, quantity }) => {
    if (!item || typeof item !== "string") return;
    setCart(prev => {
      let toRemove = Math.max(1, Number(quantity) || 1);
      const out = [];
      for (const k of prev) {
        if (toRemove > 0 && k === item) { toRemove--; continue; }
        out.push(k);
      }
      return out;
    });
  };

  const clearCart = () => setCart([]);
  const getCartTotal = () => cart.length;

  const value = useMemo(() => ({
    cart, catalog, upsertCatalog,
    addToCart, removeFromCart, clearCart, getCartTotal
  }), [cart, catalog, upsertCatalog, addToCart, removeFromCart, clearCart, getCartTotal]);


  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
