export const ModalPedidos = ({ selectedOrderId, closeModal }) => {

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
  )
}