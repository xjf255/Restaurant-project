// ListCart.jsx
import { useContext, useMemo, useState } from "react";
import { CartContext } from "../context/cart";
import { ItemCart } from "./ItemCart";
import { ModalBuy } from "./ModalBuy";

export function ListCart() {
  const { cart, catalog } = useContext(CartContext);
  const [statePay, setStatePay] = useState(false);

  const uniqueKeys = useMemo(() => Array.from(new Set(cart)), [cart]);
  const matched = useMemo(
    () => uniqueKeys.map(key => ({ key, meta: catalog[key] })).filter(x => !!x.meta),
    [uniqueKeys, catalog]
  );

  const totalPay = useMemo(
    () => matched.reduce((acc, { meta }) => acc + (meta.costo || 0), 0),
    [matched]
  );

  const handleClick = (e) => {
    if (e.target.matches("dialog.shadow") || e.target.matches("svg") || e.target.matches("path")) {
      setStatePay(false);
    }
  };

  return (
    <>
      {matched.map(({ key, meta }) => (
        <ItemCart key={key} element={{ ...meta, costo: meta.costo, img: meta.img, nombre: meta.nombre }} itemId={key} />
      ))}

      <span className="total__pay">
        <p>Order Total</p>
        <p className="total">${totalPay.toFixed(2)}</p>
      </span>

      <button className="btn--confirm" onClick={() => setStatePay(true)} disabled={matched.length === 0}>
        Confirm order
      </button>

      {statePay && <ModalBuy handleClick={handleClick} pay={totalPay} />}
    </>
  );
}
