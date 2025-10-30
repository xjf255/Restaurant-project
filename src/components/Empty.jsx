import { IconListCart } from "./Icons";

export function Empty() {
  return (
    <div className='cart--empty'>
      <IconListCart />
      <p>Agrega items</p>
    </ div>
  )
}