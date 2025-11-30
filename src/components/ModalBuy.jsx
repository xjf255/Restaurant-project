import { useContext, useMemo, useState } from "react";
import { UserContext } from "../context/user";
import { CartContext } from "../context/cart";
import "../styles/ModalBuy.css";
import { MapLeaflet } from "./MapLeaflet";

export const ModalBuy = ({
  handleClick,
  pay,
  matched = [],
  onConfirm,
}) => {
  const { client } = useContext(UserContext);
  const { cart } = useContext(CartContext);

  const defaultAddress = client?.direccion || "";
  const [useAccountAddress, setUseAccountAddress] = useState(!!defaultAddress);
  const [address, setAddress] = useState("");

  const orderItems = useMemo(() => {
    return matched
      .map(({ key, meta, category }) => {
        const quantity = cart.filter((c) => c.id === key).length;

        // valores base
        let numCombo = null;
        let hamburguesa = null;
        let bebidaNombre = null;
        let bebidaCantidad = null;
        let complemento = null;

        // lógica por categoría
        switch (category) {
          case "combos":
            numCombo = key;
            break;

          case "hamburguesas":
            hamburguesa = meta.nombre;
            break;

          case "bebidas": {
            // dividir por espacios
            const parts = (meta.key || meta.nombre || "").trim().split(/\s+/);
            if (parts.length > 1) {
              bebidaCantidad = parts.pop(); // último elemento
              bebidaNombre = parts.join(" "); // el resto
            } else {
              bebidaNombre = meta.nombre;
              bebidaCantidad = "1"; // valor por defecto
            }
            break;
          }

          case "complementos":
            complemento = meta.nombre;
            break;

          default:
            break;
        }

        return {
          idProducto: key,
          numCombo,
          hamburguesa,
          bebidaNombre,
          bebidaCantidad,
          complemento,
          cantidad: quantity,
          precioUnitario: meta.costo,
        };
      })
      .filter((item) => item.cantidad > 0);
  }, [matched, cart]);


  const stop = (e) => e.stopPropagation();

  const handleClickNoDelivery = () => {
    setUseAccountAddress(false);
    setAddress("Recoger en Tienda");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // validar dirección si no es "recoger en tienda"
    const finalAddress = useAccountAddress
      ? defaultAddress
      : address.trim();

    if (!finalAddress) {
      alert("Ingresa una dirección o selecciona 'Recoger en Tienda'.");
      return;
    }

    if (!orderItems.length) {
      alert("No hay productos en el pedido.");
      return;
    }

    const payload = {
      dpiCliente: client?.dpi ?? "",
      direccionEntrega: finalAddress,
      requireDelivery: finalAddress !== "Recoger en Tienda" ? true : false,
      total: pay,
      items: orderItems,
    };

    // deja que el padre se encargue del POST
    if (typeof onConfirm === "function") {
      onConfirm(payload);
    }

    // cierra el modal
    handleClick(e);
  };

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

        <form onSubmit={handleSubmit} className="modalBuy__form">
          <fieldset className="modalBuy__fieldset">
            <legend className="modalBuy__legend">Dirección de entrega</legend>

            <label className="modalBuy__option">
              <input
                type="radio"
                name="addr_mode"
                checked={useAccountAddress}
                onChange={() => {
                  setUseAccountAddress(true);
                  if (address === "Recoger en Tienda") setAddress("");
                }}
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
                checked={!useAccountAddress && address !== "Recoger en Tienda"}
                onChange={() => {
                  setUseAccountAddress(false);
                  if (address === "Recoger en Tienda") setAddress("");
                }}
              />
              <span>Ingresar otra dirección</span>
            </label>

            {!useAccountAddress && address !== "Recoger en Tienda" && <MapLeaflet />}

            <label className="modalBuy__option">
              <input
                type="radio"
                name="addr_mode"
                checked={address === "Recoger en Tienda"}
                onChange={handleClickNoDelivery}
              />
              <span>Recoger en Tienda</span>
            </label>
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
