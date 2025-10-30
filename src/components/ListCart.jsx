// ListCart.jsx
import { useContext, useMemo, useState } from "react";
import { CartContext } from "../context/cart";
import { ItemCart } from "./ItemCart";
import { ModalBuy } from "./ModalBuy";
import { UserContext } from "../context/user";
import { useNavigate } from "react-router-dom";

export function ListCart() {
  const { cart, catalog } = useContext(CartContext);
  const { client } = useContext(UserContext)
  const navigate = useNavigate()
  const [statePay, setStatePay] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  const uniqueKeys = useMemo(
    () => Array.from(new Set(cart.map((c) => c.id))),
    [cart]
  );

  const matched = useMemo(() => {
    return uniqueKeys
      .map((key) => {
        const meta = catalog[key];
        if (!meta) return null;

        // Obtener la categoría del primer elemento que coincida en el carrito
        const found = cart.find((c) => c.id === key);
        const category = found?.category || meta?.category || "sin-categoria";

        return { key, meta, category };
      })
      .filter(Boolean);
  }, [uniqueKeys, catalog, cart]);

  const totalPay = useMemo(
    () => matched.reduce((acc, { meta }) => acc + (meta.costo || 0), 0),
    [matched]
  );


  const handleOrderConfirm = async (payload) => {
    await fetch(`${API_URL}/pedidos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    // limpiar carrito, mostrar toast, etc.
  };


  const handleClick = (e) => {
    setStatePay(false);
  };

  const handleClickNotClient = () => {
    if (client !== null) {
      setStatePay(true);
      return
    }
    navigate("/registration")
  }

  return (
    <>
      {matched.map(({ key, meta, category }) => (
        <ItemCart key={key} element={{ ...meta, costo: meta.costo, img: meta.img, nombre: meta.nombre,category }} itemId={key} />
      ))}

      <span className="total__pay">
        <p>Order Total</p>
        <p className="total">${totalPay.toFixed(2)}</p>
      </span>

      <button className="btn--confirm" onClick={handleClickNotClient}>
        Confirm order
      </button>

      {statePay && <ModalBuy handleClick={handleClick} pay={totalPay} matched={matched} onConfirm={handleOrderConfirm} />}
    </>
  );
}
