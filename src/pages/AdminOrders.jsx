import { useEffect, useState } from "react"
import "../styles/AdminOrders.css"

const API_URL = import.meta.env.VITE_API_URL

const ESTADOS = [
  "PENDIENTE",
  "CONFIRMADO",
  "EN_PREPARACION",
  "ENTREGADO",
  "CANCELADO"
]

export const AdminOrders = () => {
  const [orders, setOrders] = useState([])
  const [filter, setFilter] = useState("TODOS")
  const [loading, setLoading] = useState(false)

  const [selectedOrderId, setSelectedOrderId] = useState(null)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [statusUpdating, setStatusUpdating] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true)
        const res = await fetch(`${API_URL}/pedidos`)
        if (!res.ok) throw new Error("No se pudieron obtener los pedidos")
        const data = await res.json()
        setOrders(data)
      } catch (err) {
        console.error(err)
        setError(err.message || "Error al cargar pedidos")
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  // 2. cuando cambia selectedOrderId, traer detalle
  useEffect(() => {
    if (!selectedOrderId) return
    const fetchDetail = async () => {
      try {
        setDetailLoading(true)
        const res = await fetch(`${API_URL}/pedidos/${selectedOrderId}`)
        if (!res.ok) throw new Error("No se pudo obtener el detalle")
        const detail = await res.json()
        setSelectedOrder(detail)
      } catch (err) {
        console.error(err)
        setError(err.message || "Error al cargar detalle")
      } finally {
        setDetailLoading(false)
      }
    }
    fetchDetail()
  }, [selectedOrderId])

  // 3. pedidos filtrados
  const filteredOrders = orders.filter((o) => {
    if (filter === "TODOS") return true
    return o.estado?.estado === filter
  })

  // 4. abrir modal
  const openOrder = (numPedido) => {
    setSelectedOrderId(numPedido)
  }

  // 5. cerrar modal
  const closeModal = () => {
    setSelectedOrderId(null)
    setSelectedOrder(null)
  }

  // 6. actualizar estado
  const handleChangeStatus = async (newStatus) => {
    if (!selectedOrderId) return
    try {
      setStatusUpdating(true)
      const res = await fetch(`${API_URL}/pedidos/${selectedOrderId}/estado?nuevoEstado=${newStatus}`, {
        method: "PATCH",
      })
      if (!res.ok) throw new Error("No se pudo actualizar el estado")

      setSelectedOrder((prev) =>
        prev ? { ...prev, estado: newStatus } : prev
      )

      setOrders((prev) =>
        prev.map((o) =>
          o.numPedido === selectedOrderId
            ? { ...o, estado: { estado: newStatus } }
            : o
        )
      )
    } catch (err) {
      console.error(err)
      setError(err.message || "Error al actualizar estado")
    } finally {
      setStatusUpdating(false)
    }
  }

  return (
    <div className="adminOrders">
      <header className="adminOrders__header">
        <h1>Pedidos</h1>
        <div className="adminOrders__filters">
          <label>Filtrar por estado:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="TODOS">Todos</option>
            <option value="PENDIENTE">Pendiente</option>
            <option value="CONFIRMADO">Confirmado</option>
            <option value="EN_PREPARACION">En preparación</option>
            <option value="ENTREGADO">Entregado</option>
            <option value="CANCELADO">Cancelado</option>
          </select>
        </div>
      </header>

      {loading ? (
        <p>Cargando pedidos...</p>
      ) : error ? (
        <p className="adminOrders__error">{error}</p>
      ) : filteredOrders.length === 0 ? (
        <p>No hay pedidos para mostrar.</p>
      ) : (
        <table className="adminOrders__table">
          <thead>
            <tr>
              <th># Pedido</th>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>DPI</th>
              <th>Estado</th>
              <th>Total (Q)</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr
                key={order.numPedido}
                onClick={() => openOrder(order.numPedido)}
                className="adminOrders__row"
              >
                <td>{order.numPedido}</td>
                <td>{new Date(order.fecha).toLocaleString()}</td>
                <td>{order.clienteNombre}</td>
                <td>{order.clienteDpi}</td>
                <td>
                  <span className={`pill pill--${order.estado?.estado?.toLowerCase()}`}>
                    {order.estado?.estado}
                  </span>
                </td>
                <td>Q {Number(order.total).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* MODAL DETALLE */}
      {selectedOrderId && (
        <dialog className="adminOrders__modal" open onClick={closeModal}>
          <div className="adminOrders__modal-body" onClick={(e) => e.stopPropagation()}>
            {detailLoading || !selectedOrder ? (
              <p>Cargando detalle...</p>
            ) : (
              <>
                <header className="adminOrders__modal-header">
                  <h2>Pedido {selectedOrder.numPedido}</h2>
                  <button onClick={closeModal} className="adminOrders__close">
                    ✕
                  </button>
                </header>

                <section className="adminOrders__section">
                  <p><strong>Fecha:</strong> {new Date(selectedOrder.fecha).toLocaleString()}</p>
                  <p><strong>Estado actual:</strong> {selectedOrder.estado}</p>
                  <p><strong>Cliente:</strong> {selectedOrder.cliente.nombre} {selectedOrder.cliente.apellido}</p>
                  <p><strong>DPI:</strong> {selectedOrder.cliente.dpi}</p>
                  <p><strong>Dirección entrega:</strong> {selectedOrder.direccionEntrega}</p>
                  <p><strong>Delivery:</strong> {selectedOrder.requiereDelivery ? "Sí" : "No"}</p>
                  <p><strong>Total:</strong> Q {Number(selectedOrder.total).toFixed(2)}</p>
                </section>

                <section className="adminOrders__section">
                  <h3>Items</h3>
                  <ul className="adminOrders__items">
                    {selectedOrder.items?.map((it) => {
                      const label =
                        it.combo?.numCombo
                          ? `Combo: ${it.combo.numCombo}`
                          : it.hamburguesa?.nombre
                            ? `Hamburguesa: ${it.hamburguesa.nombre}`
                            : it.bebida?.nombre
                              ? `Bebida: ${it.bebida.nombre}`
                              : it.complemento?.nombre
                                ? `Complemento: ${it.complemento.nombre}`
                                : "Item"

                      return (
                        <li key={it.idDetalle} className="adminOrders__item">
                          <span>{label}</span>
                          <span>Cant: {it.cantidad}</span>
                          <span>Q {Number(it.subtotal).toFixed(2)}</span>
                        </li>
                      )
                    })}
                  </ul>
                </section>

                <section className="adminOrders__section">
                  <label htmlFor="estado">Cambiar estado:</label>
                  <select
                    id="estado"
                    defaultValue={selectedOrder.estado}
                    onChange={(e) => handleChangeStatus(e.target.value)}
                    disabled={statusUpdating}
                  >
                    {ESTADOS.map((es) => (
                      <option key={es} value={es}>
                        {es}
                      </option>
                    ))}
                  </select>
                  {statusUpdating && <p>Actualizando estado...</p>}
                </section>
              </>
            )}
          </div>
        </dialog>
      )}
    </div>
  )
}
