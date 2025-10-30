import { useState } from "react"
import "../styles/Login.css"
import { LOGIN } from "../constants"
import { SignIn } from "../components/SignIn"
import { Register } from "../components/Register"

export default function Login() {

  const [type, setType] = useState(LOGIN[0])

  const handleClick = (el) => {
    setType(LOGIN[1] === el ? LOGIN[1] : LOGIN[0])
  }

  return (
    <section className="login">
      <div className="form">
        <div className="form__toogle">
          {LOGIN.map(el => <button key={el} onClick={() => handleClick(el)} className={type === el ? "active" : ""} >{el}</button>)}
        </div>
        {type === LOGIN[0] ? <SignIn/> : <Register/>}
      </div>
    </section>
  )
}