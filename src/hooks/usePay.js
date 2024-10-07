import { useEffect } from "react"

export function usePay(){
  useEffectt(() => {
    setPay(0)
    data.map(el => {
      if (cart.includes(el.name)) {
        setPay(prevValue => prevValue + (el.price * cart.filter(ele => ele === el.name).length))
      }
    })
  }, [cart])
}