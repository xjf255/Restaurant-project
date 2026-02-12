import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../context/admin";

export const AdminLogout = () => {
  const { toggleAdmin } = useContext(AdminContext)
  const navigate = useNavigate();
  const onLogout = () => {
    toggleAdmin()
    navigate("/", { replace: true });
  };
  return (
    <button onClick={onLogout} className="authAdmin__logoutBtn" style={{ width: "200px" }}>
      Cerrar sesión
    </button>
  );
};
