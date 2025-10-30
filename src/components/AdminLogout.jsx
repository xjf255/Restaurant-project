import { useNavigate } from "react-router-dom";

export const AdminLogout = () => {
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin/login", { replace: true });
  };
  return (
    <button onClick={onLogout} className="authAdmin__logoutBtn" style={{width:"200px"}}>
      Cerrar sesión
    </button>
  );
};
