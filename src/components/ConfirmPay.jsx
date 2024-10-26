import { useRef } from "react"
import { validarFormulario } from "../services/regex"

export default function ConfirmPay({ change }) {

  const formRef = useRef()

  const handleClick = () => {
    if (validarFormulario(formRef.current)) {
      change()
    }
  }

  return (
    <form className="pay" ref={formRef}>
      <label>
        No. tarjeta
        <input
          pattern="^(\d{4}\s){3}\d{4}$"
          type="text"
          maxLength={19}
          name="cardNumber"
          placeholder="1234 5678 9012 3456"
        />
      </label>
      <label>
        CVV
        <input
          type="text"
          maxLength={3}
          name="cvv"
          placeholder="123"
        />
      </label>
      <label>
        Fecha
        <span>
          <input
            className="date"
            type="text"
            maxLength={2}
            name="month"
            placeholder="MM"
          />
          <span>/</span>
          <input
            className="date"
            type="text"
            maxLength={4}
            name="year"
            placeholder="AAAA"
          />
        </span>
      </label>
      <button type="submit" onClick={handleClick}>
        Sign in
      </button>
    </form>

  )
}