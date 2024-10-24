import "../Coupon.css"
import { useQuery } from "@tanstack/react-query"

export default function Coupons() {

  const COUPON_URL = import.meta.env.VITE_COUPON_URL

  const fetchData = async () => {
    const data = await fetch(COUPON_URL)
    if (!data.ok) {
      throw new Error('Error en la obtencion de datos')
    }
    return data.json()
  }

  const { isLoading, data: statusApi, isError } = useQuery({
    queryKey: ['status'],//key => para identificar query
    queryFn: fetchData,// function => para obtener datos
    refetchOnWindowFocus: false
  })

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