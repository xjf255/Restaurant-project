import { useQuery } from "@tanstack/react-query"
import "../Coupon.css"

export default function Coupons() {
  const { isLoading, data: statusApi, isError } = useQuery({ queryKey: ["coupon"] })

  return (
    <ul className="coupons">
      <li className="coupons__title">
        <h3>Titulo</h3>
        <h3>Fecha de Expiración</h3>
        <h3>Estado</h3>
      </li>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Ha habido un error</p>}
      {statusApi ? statusApi.map((el) => {
        const { cod_coupon, expiration_date, id_coupon, status } = el
        const { name_status, entity } = status
        if (entity === 'cupón') {
          return (
            <li key={id_coupon}>
              <p>{cod_coupon}</p>
              <p>{name_status}</p>
              <p>{expiration_date}</p>
            </li>
          )
        }
      }) : false}
    </ul>
  )
}