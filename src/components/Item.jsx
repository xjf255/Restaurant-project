import { useContext } from "react";
import { BtnCart } from "./BtnCart";
import { Toogle } from "./Toogle";
import { CartContext } from "../context/cart";

export const Item = ({ element }) => {
  const { cart } = useContext(CartContext);

  // Desestructuración con valores por defecto
  const {
    nombre = "Sin nombre",
    img = "/placeholder.jpg",
    costo = 0,
    existencia = true,
    cantidad = "",
    descripcion = "Sin descripción",
    numCombo,
    numPromocion,
  } = element;

  // Si no existe, no renderizar
  if (!existencia) return null;

  // === Construcción de clave única (itemKey) ===
  const baseKey = nombre.trim().toLowerCase();
  const cantidadKey = cantidad ? cantidad.trim().toLowerCase() : "";
  const comboKey = numCombo ? `combo-${numCombo}` : "";
  const promoKey = numPromocion ? `promo-${numPromocion}` : "";

  // Prioridad: numCombo > numPromocion > nombre+cantidad > nombre
  const itemKey = comboKey || promoKey || (cantidadKey ? `${baseKey}-${cantidadKey}` : baseKey);

  // === Verificar si está en el carrito ===
  const isInCart = cart.some((cartItem) => {
    const cartNombre = (cartItem.nombre || "").trim().toLowerCase();
    const cartCantidad = (cartItem.cantidad || "").trim().toLowerCase();
    const cartCombo = cartItem.numCombo ? `combo-${cartItem.numCombo}` : "";
    const cartPromo = cartItem.numPromocion ? `promo-${cartItem.numPromocion}` : "";

    const cartKey = cartCombo || cartPromo || (cartCantidad ? `${cartNombre}-${cartCantidad}` : cartNombre);
    return cartKey === itemKey;
  });

  const displayName = cantidad ? `${nombre} ${cantidad}` : nombre;

  return (
    <li key={itemKey} className="food">
      <figure className="food__figure">
        <img
          src={img}
          alt={`Imagen de ${displayName}`}
          loading="lazy"
          onError={(e) => {
            e.target.src = "/placeholder.jpg";
          }}
        />
        <figcaption className="food__actions">
          {isInCart ? (
            <Toogle itemKey={itemKey} />
          ) : (
            <BtnCart itemKey={itemKey} />
          )}
        </figcaption>
      </figure>

      <div className="food__info">
        <h3 className="food__name">{displayName}</h3>
        {descripcion && <p className="food__description">{descripcion}</p>}
        <span className="food__price">${costo.toFixed(2)}</span>
      </div>
    </li>
  );
};