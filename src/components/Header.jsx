import { useContext } from "react"
import { TITLES } from "../constants"
import { NavLink, Outlet } from "react-router-dom"
import { UserContext } from "../context/user"
import { BtnCliente } from "./BtnCliente"


export const Header = () => {
  const { client } = useContext(UserContext)
  return (
    <>
      <section className="header__container">
        <img className="banner" src="/assets/banner.png" alt="Banner Antigua Burguer" />
        <header className="header">
          {TITLES.map(title =>
            <NavLink className="title" to={`/${title.toLocaleLowerCase()}`} key={title}>{title}</NavLink>
          )}
        </header>

        <div className="register__container">
          {!client ? <NavLink className="register" to={"/registration"}>Registrarse</NavLink> : <BtnCliente />}
        </div>
      </section>
      <Outlet />
    </>
  )
}