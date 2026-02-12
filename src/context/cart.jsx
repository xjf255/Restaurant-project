import { createContext, useCallback, useEffect, useMemo, useState } from "react";

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

      if (!Array.isArray(saved)) return [];

      return saved
        .map((item) => {
          if (typeof item === "string") {
            return { id: item, category: undefined };
          }
          if (item && typeof item === "object" && typeof item.id === "string") {
            return {
              id: item.id,
              category: item.category,
            };
          }
          return null;
        })
        .filter(Boolean);
    } catch {
      return [];
    }
  });

  const [catalog, setCatalog] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("catalogIndex") || "{}");
      return saved && typeof saved === "object" ? saved : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("catalogIndex", JSON.stringify(catalog));
  }, [catalog]);

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
        : cantidad !== "0"
        ? `${nombre} ${cantidad}`
        : nombre;
    return (numPromocion || numCombo || displayName.trim().toLowerCase()) ?? "";
  };

  const upsertCatalog = useCallback((items = []) => {
    if (!Array.isArray(items) || items.length === 0) return;

    setCatalog((prev) => {
      let changed = false;
      const next = { ...prev };

      for (const el of items) {
        const key = getItemKey(el);
        if (!key) continue;

        const raw = el.costo;
        const costo =
          typeof raw === "number"
            ? raw
            : Number(String(raw).replace(/[^0-9.]/g, "")) || 0;

        const nuevo = {
          key,
          nombre: el.nombre ?? el.descripcion ?? key,
          costo,
          img: el.img ?? "/placeholder.jpg",
          category:
            el.category ??
            el.categoria ??
            el.tipo ??
            undefined,
        };

        const viejo = prev[key];
        if (
          !viejo ||
          viejo.costo !== nuevo.costo ||
          viejo.nombre !== nuevo.nombre ||
          viejo.img !== nuevo.img ||
          viejo.category !== nuevo.category
        ) {
          next[key] = nuevo;
          changed = true;
        }
      }
      return changed ? next : prev;
    });
  }, []);

  const addToCart = useCallback(
    ({ item, quantity = 1, category }) => {
      if (!item || typeof item !== "string") return;
      const qty = Math.max(1, Number(quantity) || 1);

      const entries = Array(qty)
        .fill(null)
        .map(() => ({
          id: item,
          category: category,
        }));

      setCart((prev) => [...prev, ...entries]);
    },
    []
  );

  const removeFromCart = useCallback(({ item, quantity }) => {
    if (!item || typeof item !== "string") return;

    setCart((prev) => {
      let toRemove = Math.max(1, Number(quantity) || 1);
      const out = [];

      for (const entry of prev) {
        if (toRemove > 0 && entry.id === item) {
          toRemove--;
          continue;
        }
        out.push(entry);
      }

      return out;
    });
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const getCartTotal = useCallback(() => cart.length, [cart]);

  const value = useMemo(
    () => ({
      cart,
      catalog,
      upsertCatalog,
      addToCart,
      removeFromCart,
      clearCart,
      getCartTotal,
    }),
    [cart, catalog, upsertCatalog, addToCart, removeFromCart, clearCart, getCartTotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
