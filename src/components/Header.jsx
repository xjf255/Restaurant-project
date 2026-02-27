import { useContext } from "react"
import { NavLink, Outlet } from "react-router-dom"
import { UserContext } from "../context/user"
import { BtnCliente } from "./BtnCliente"
import { AdminContext } from "../context/admin"


export const Header = (TitleList) => {
  const { client } = useContext(UserContext)
  const { isAdmin } = useContext(AdminContext)

  const TitleListToArray = Object.values(TitleList).flat()
  return (
    <>
      <section className="header__container">
        <img className="banner" src="/assets/banner.png" alt="Banner Antigua Burguer" />
        <header className="header">
          {TitleListToArray.map(title =>
            <NavLink className="title" to={`${isAdmin ? "" : "/"}${title}`} key={title}>{title}</NavLink>
          )}
        </header>

        <div className="register__container">
          {!client ? <NavLink className="register" to={"/registration"}>Registrarse</NavLink> : <BtnCliente />}
        </div>
      </section>
    </>
  )
}