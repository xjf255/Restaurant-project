import { NavLink } from "react-router-dom"

export const SignIn = () => {

  const forgotPasswordClick = () => {
    alert("This is experimental")
  }

  const signInClick = (e) => {
    e.preventDefault()
    console.log("ingresa")
  }

  return (
    <>
      <form>
        <label>
          Email
          <input type="text" placeholder="Ingrese su correo..." />
        </label>
        <label>
          Password
          <input type="password" placeholder="Ingrese su contraseña..." />
        </label>
        <button type="submit" onClick={signInClick}>
          <NavLink to={"/dessets"}>Sign in</NavLink>
        </button>
      </form>
      <span onClick={forgotPasswordClick}>
        <p className="password--recover">forgot password?</p>
      </span>
    </>
  )
}