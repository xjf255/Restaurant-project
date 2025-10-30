import { createContext, useCallback, useEffect, useMemo, useState } from "react";

export const CartContext = createContext({
  cart: [],               // [{ id: string, category?: string }]
  catalog: {},
  upsertCatalog: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  getCartTotal: () => 0,
});

export const CartProvider = ({ children }) => {
  // === 1. Cargar carrito desde localStorage y normalizar ===
  const [cart, setCart] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("cart") || "[]");

      if (!Array.isArray(saved)) return [];

      // normalizar: puede venir ["cb0001", "cb0001"] o [{id:"cb0001"}]
      return saved
        .map((item) => {
          if (typeof item === "string") {
            return { id: item, category: undefined };
          }
          if (item && typeof item === "object" && typeof item.id === "string") {
            return {
              id: item.id,
              category: item.category, // puede venir
            };
          }
          return null;
        })
        .filter(Boolean);
    } catch {
      return [];
    }
  });

  // === 2. Catálogo global ===
  const [catalog, setCatalog] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("catalogIndex") || "{}");
      return saved && typeof saved === "object" ? saved : {};
    } catch {
      return {};
    }
  });

  // persistencia
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
        : cantidad !== "0"
        ? `${nombre} ${cantidad}`
        : nombre;
    return (numPromocion || numCombo || displayName.trim().toLowerCase()) ?? "";
  };

  // === 3. upsertCatalog: ahora también guarda la category si viene en el item ===
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
          // 👇 si el backend/FE te manda la categoría, la guardamos
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

  // === 4. addToCart: ahora guarda también la categoría en cada entrada ===
  const addToCart = useCallback(
    ({ item, quantity = 1, category }) => {
      if (!item || typeof item !== "string") return;
      const qty = Math.max(1, Number(quantity) || 1);

      const entries = Array(qty)
        .fill(null)
        .map(() => ({
          id: item,
          category: category, // 👈 se guarda junto al item
        }));

      setCart((prev) => [...prev, ...entries]);
    },
    []
  );

  // === 5. removeFromCart: compara por id (no por objeto completo) ===
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

  // memo del value
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
