import { TITLES } from "../constants"
import { NavLink } from "react-router-dom"

export const Header = () => {
  return (
    <header className="header">
      {TITLES.map(title => <NavLink className="title" to={`/${title.toLocaleLowerCase()}`} key={title}>{title}</NavLink>)}
    </header>
  )
}