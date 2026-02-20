import { TITLES } from "../constants"
import { Header } from "./Header"

export const AdminDashboard = () => {
  const updatedTitles = [...TITLES, "Pedidos"]
  return (
    <section className="adminOrders__header">
      <Header TitleList={updatedTitles} />
    </section>
  )
}