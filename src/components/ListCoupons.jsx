import { useQuery } from '@tanstack/react-query'

export const ListCoupons = ({ addCoupon }) => {
  const { data } = useQuery({ queryKey: ["coupon"] })
  return (
    <div className='coupon'>
      <p className='title'>Do you want to add a coupon?</p>
      {data.map(el => {
        const { id_coupon, cod_coupon, value, status } = el
        const { name_status } = status
        if (name_status !== 'disponible') return
        return (
          <span key={id_coupon} onClick={() => { addCoupon(id_coupon) }} className='coupon--selected'>
            <p>{cod_coupon.toUpperCase()}</p>
            <p className="value">${value}</p>
          </span>
        )
      })}
      <span className='coupon--selected next' onClick={() => { addCoupon(null) }}>
        <p>no, thank you!</p>
      </span>
    </div>
  )
}