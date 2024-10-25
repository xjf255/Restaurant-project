import { useEffect, useState } from "react"
import { IconCross } from "./Icons"
import { PayMethod } from "./PayMethod"
import { ListCoupons } from "./ListCoupons"

export const ModalBuy = ({ handleClick }) => {

  const [methodSelected, setMethodSelected] = useState(null)

  useEffect(() => {
    const $body = document.querySelector("body")
    $body.style.position = "fixed"

    return () => {
      $body.style.position = ""
    }
  }, [])

  const changeMethod = (el) =>{
    setMethodSelected(el)
  }

  console.log(methodSelected)

  return (
    <dialog className="shadow" onClick={handleClick}>
      <div className="card">
        <span>
          <h2>Payment</h2>
          <IconCross />
        </span>
        <hr />
        <PayMethod fn={changeMethod} />
        {methodSelected && <ListCoupons />}
      </div>
    </dialog>
  )
}
