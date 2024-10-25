import { useState } from "react"
import "../Login.css"
import { LOGIN } from "../constants"
import { SignIn } from "../components/SignIn"
import { Register } from "../components/Register"

export default function Login({setIsActive}) {

  const [type, setType] = useState(LOGIN[0])

  const handleClick = (el) => {
    setType(LOGIN[1] === el ? LOGIN[1] : LOGIN[0])
  }

  return (
    <section className="login">
      <div className="form" style={type === LOGIN[1] ? { height: "440px" } : { height: "380px" }}>
        <div className="form__toogle">
          {LOGIN.map(el => <button key={el} onClick={() => handleClick(el)} className={type === el ? "active" : ""} >{el}</button>)}
        </div>
        {type === LOGIN[0] ? <SignIn changeIsActive={setIsActive}/> : <Register changeIsActive={setIsActive}/>}
      </div>
    </section>
  )
}