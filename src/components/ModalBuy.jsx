import { useContext, useEffect, useMemo, useState } from "react";
import { UserContext } from "../context/user";
import "../styles/ModalBuy.css"

export const ModalBuy = ({
  handleClick,
  pay
}) => {
  const { client } = useContext(UserContext)
  const defaultAddress = client.direccion
  const [useAccountAddress, setUseAccountAddress] = useState(!!defaultAddress);
  const [address, setAddress] = useState("")


  const submit = (e) => {
    e.preventDefault();
    const payload = {
      useAccountAddress,
      address: useAccountAddress ? defaultAddress : address.trim(),
      total: pay,
    };

    onConfirm?.(payload);
  };

  const stop = (e) => e.stopPropagation();

  return (
    <dialog className="modalBuy" onClick={handleClick} open>
  <div onClick={stop} className="modalBuy__container">
    <header className="modalBuy__header">
      <div>
        <h2 className="modalBuy__title">Confirmar pedido</h2>
        <p className="modalBuy__subtitle">
          Revisa la dirección de entrega y confirma.{" "}
          <strong>El pago se realiza al momento de la entrega</strong>.
        </p>
      </div>
    </header>

    <form onSubmit={submit} className="modalBuy__form">
      <fieldset className="modalBuy__fieldset">
        <legend className="modalBuy__legend">Dirección de entrega</legend>

        <label className="modalBuy__option">
          <input
            type="radio"
            name="addr_mode"
            checked={useAccountAddress}
            onChange={() => setUseAccountAddress(true)}
          />
          <span>Usar dirección de mi cuenta</span>
        </label>

        {defaultAddress ? (
          <div className="modalBuy__accountAddress">{defaultAddress}</div>
        ) : (
          <div className="modalBuy__noAddress">No hay dirección guardada.</div>
        )}

        <label className="modalBuy__option">
          <input
            type="radio"
            name="addr_mode"
            checked={!useAccountAddress}
            onChange={() => setUseAccountAddress(false)}
          />
          <span>Ingresar otra dirección</span>
        </label>

        {!useAccountAddress && (
          <div className="modalBuy__extraFields">
            <div className="modalBuy__field">
              <label className="modalBuy__label">Dirección*</label>
              <input
                className="modalBuy__input"
                placeholder="Calle/Avenida, zona, referencias…"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
        )}
      </fieldset>

      <div className="modalBuy__summary">
        <div className="modalBuy__payment">
          <p>Método de pago</p>
          <p className="modalBuy__payment-method">Pago contra entrega</p>
        </div>
        <div className="modalBuy__total">
          <p className="modalBuy__total-label">Order Total</p>
          <p className="modalBuy__total-amount">${pay.toFixed(2)}</p>
        </div>
      </div>

      <button
        type="submit"
        className="modalBuy__confirmBtn"
        title="Confirmar pedido (pago contra entrega)"
      >
        Confirmar pedido
      </button>
    </form>
  </div>
</dialog>

  );
};
