import { AdminOrders } from "../pages/AdminOrders"
import { AdminLogout } from "./AdminLogout"

export const AdminDashboard = () => {
  return (
    <div>
      <header style={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 20px", borderBottom:"1px solid #000"}}>
        <h1>Admin Dashboard</h1>
        <AdminLogout />
      </header>

      <AdminOrders />
    </div>
  )
}