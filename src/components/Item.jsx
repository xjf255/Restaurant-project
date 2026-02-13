import { useContext } from "react"
import { BtnCart } from "./BtnCart"
import { Toogle } from "./Toogle"
import { CartContext } from "../context/cart"
import { AdminContext } from "../context/admin"
import { ConfigItem } from "./ConfigItem"

export const Item = ({ element, category }) => {
  const { cart } = useContext(CartContext)
  const { isAdmin } = useContext(AdminContext)
  const {
    nombre = "Sin nombre",
    img,
    costo,
    existencia = true,
    cantidad = "0",
    diasDisponibles = "1",
    descripcion = "Sin descripción",
    numCombo,
    numPromocion,
  } = element

  if (!existencia || diasDisponibles === "0") return null
  let displayName = cantidad !== "0" ? `${nombre} ${cantidad}` : nombre

  if (nombre === "Sin nombre" && cantidad === "0") {
    displayName = descripcion
  }
  const itemKey = numPromocion || numCombo || displayName.trim().toLowerCase()

  const isInCart = cart.some((cartItem) => cartItem.id === itemKey);

  return (
    <li key={itemKey} className="food">
      <figure className="food__figure">
        <img
          src={img}
          alt={`Imagen de ${displayName}`}
          loading="lazy"
          onError={(e) => {
            e.target.src = "/placeholder.jpg"
          }}
        />
        {isAdmin ? (
          <ConfigItem element={element} category={category} />
        ) : isInCart ? (
          <Toogle item={itemKey} category={category} />
        ) : (
          <BtnCart item={itemKey} category={category} />
        )}

      </figure>

      <div className="food__info">
        <span className="food__category">{category}</span>
        <h3 className="food__name">{displayName}</h3>
        <span className="food__price">${costo.toFixed(2)}</span>
      </div>
    </li>
  )
}