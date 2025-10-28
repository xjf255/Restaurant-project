import { TITLES } from "../constants"
import { NavLink } from "react-router-dom"


export const Header = () => {
  return (
    <section className="header__container">
      <img className="banner" src="/assets/banner.png" alt="Banner Antigua Burguer" />
      <header className="header">
        {TITLES.map(title =>
          <NavLink className="title" to={`/${title.toLocaleLowerCase()}`} key={title}>{title}</NavLink>
        )}
      </header>
    </section>
  )
}