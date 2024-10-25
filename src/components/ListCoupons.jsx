import { useQuery } from '@tanstack/react-query'
export const ListCoupons = () => {
  console.log('entra')
  const { data, isError, isLoading } = useQuery({ queryKey: ["coupon"] })
  console.log(data, isError, isLoading)
  return (
    <div className='coupon'>
      {data.map(el => {
        const {id_coupon,cod_coupon,value,status} = el
        const {name_status} = status
        if(name_status === 'disponible') return 
        return (
          <span key={id_coupon} className='coupon--selected'>
            <p>{cod_coupon.toUpperCase()}</p>
            <p className="value">${value}</p>
          </span>
        )
      })}
    </div>
  )
}