import { useEffect, useState } from "react"
import { IconCross } from "./Icons"
import { PayMethod } from "./PayMethod"
import { ListCoupons } from "./ListCoupons"
import ConfirmPay from "./ConfirmPay"
import { Pay } from "./Pay"

export const ModalBuy = ({ handleClick , pay}) => {

  const [methodSelected, setMethodSelected] = useState(null)
  const [couponSelected, setCouponSelected] = useState(null)
  const [step, setStep] = useState(0)

  useEffect(() => {
    const $body = document.querySelector("body")
    $body.style.position = "fixed"

    return () => {
      $body.style.position = ""
    }
  }, [])

  const changeMethod = (el) => {
    setMethodSelected(el)
    setStep(prev => prev + 1)
  }

  const addCoupon = (cod_coupon) => {
    setCouponSelected(cod_coupon)
    setStep(prev => prev + 1)
  }

  const change = () => {
    setStep(prev => prev + 1)
  }

  return (
    <dialog className="shadow" onClick={handleClick}>
      <div className="card">
        <span>
          <h2>Payment</h2>
          <IconCross />
        </span>
        <hr />
        {step === 0 && <PayMethod fn={changeMethod} />}
        {step === 1 && methodSelected && <ListCoupons addCoupon={addCoupon} />}
        {step === 2 && <ConfirmPay change={change}/>}
        {step === 3 && <Pay method={methodSelected} coupon={couponSelected} pay={pay}/>}
      </div>
    </dialog>
  )
}
