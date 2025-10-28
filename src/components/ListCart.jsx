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

  const handleClickNotClient = () => {
    if (client !== null) {
      setStatePay(true);
      return
    }
    navigate("/registration")
  }

  return (
    <>
      {matched.map(({ key, meta }) => (
        <ItemCart key={key} element={{ ...meta, costo: meta.costo, img: meta.img, nombre: meta.nombre }} itemId={key} />
      ))}

      <span className="total__pay">
        <p>Order Total</p>
        <p className="total">${totalPay.toFixed(2)}</p>
      </span>

      <button className="btn--confirm" onClick={handleClickNotClient}>
        Confirm order
      </button>

      {statePay && <ModalBuy handleClick={handleClick} pay={totalPay} />}
    </>
  );
}
