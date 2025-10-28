import { useContext } from "react"
import { UserContext } from "../context/user"
import { User } from "./User"

export const BtnCliente = () => {
  const { client } = useContext(UserContext)
  return (
    <div className="btn__cliente">
      <User />
      {client.nombre + " " + client.apellido}
    </div>
  )
}