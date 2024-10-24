import { NavLink } from "react-router-dom"

export const Register = () => {

  const registerClick = (e) => {
    e.preventDefault()
    console.log("ingresa")
  }

  return (
    <form>
      <label>
        Nombre
        <input type="text" placeholder="Ingrese su nombre..." />
      </label>
      <label>
        Email
        <input type="text" placeholder="Ingrese su correo..." />
      </label>
      <label>
        Password
        <input type="password" placeholder="Ingrese su contraseña..." />
      </label>
      <button type="submit" onClick={registerClick}>
        <NavLink to={"/dessets"}>Register</NavLink>
      </button>
    </form>
  )
}