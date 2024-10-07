import { IconListCart } from "./Icons";

export function Empty() {
  return (
    <div className='cart--empty'>
      <IconListCart />
      <p>your added items will appear here</p>
    </ div>
  )
}