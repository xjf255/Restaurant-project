import { useNavigate } from "react-router-dom";

export const AdminLogout = () => {
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin/login", { replace: true });
  };
  return (
    <button onClick={onLogout} className="authAdmin__logoutBtn">
      Cerrar sesión
    </button>
  );
};
