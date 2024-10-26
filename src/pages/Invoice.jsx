import "../bill.css"
import { useQuery } from "@tanstack/react-query"

export default function Invoice() {
  const { data } = useQuery({ queryKey: ["bill"] })

  return (
    <>
      <table border="1">
        <thead>
          <tr>
            <th>Codigo Factura</th>
            <th>Fecha</th>
            <th>Numero de Pedido</th>
            <th>Coupon</th>
            <th>Monto total</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map(bill => {
            const { cod_bill, idPay, idPedido } = bill
            const { total_amount, coupon = {}, date_pay } = idPay
            const cod_coupon = coupon?.cod_coupon || "N/A"
            return (
              <tr key={cod_bill}>
                <td>{cod_bill}</td>
                <td>{date_pay}</td>
                <td>{idPedido}</td>
                <td>{cod_coupon}</td>
                <td>{total_amount}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}