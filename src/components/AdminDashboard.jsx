import { AdminLogout } from "./AdminLogout"
import { TITLES } from "../constants"
import { Header } from "./Header"

export const AdminDashboard = () => {
  const updatedTitles = { ...TITLES, pedidos: "Pedidos" }
  return (
    <section className="adminOrders__header">
      <AdminLogout />
      <Header TitleList={Object.values(updatedTitles)} />
    </section>
  )
}